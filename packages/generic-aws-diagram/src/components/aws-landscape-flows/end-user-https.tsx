import { all, chain, waitFor } from "@motion-canvas/core/lib/flow";
import { TAWSLandscape, Tags } from "../aws-landscape";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { Reference } from "@motion-canvas/core/lib/utils";
import { Shape } from "@motion-canvas/2d/lib/components";

export function endUserHTTPSFlowRewind(landscape: TAWSLandscape): ThreadGenerator {
    return chain(
        endUserLambdaLineAnimations(landscape, 0, landscape.lineDrawDurration / 10, false),
        endUserServerLineAnimations(landscape, 0, landscape.lineDrawDurration / 10, false),
        endUserDNSLineAnimations(landscape, 0, landscape.lineDrawDurration / 10, false),
        landscape.globalUsers_arrow_to_internet().end(0, landscape.lineDrawDurration / 10),
    )
}

export function endUserHTTPSLowLight(landscape: TAWSLandscape): ThreadGenerator {
    let generators: Array<ThreadGenerator> = []

    console.log(landscape)
    landscape.getRefsExcludingTags([Tags.EndUser]).forEach(e => {
        generators.push(e().opacity(.2, landscape.lineDrawDurration))
    })    

    return all(...generators)
}

export function endUserHTTPSFlow(landscape: TAWSLandscape): ThreadGenerator {
    return chain(
        landscape.highlight(landscape.globalUsers.ref),
        landscape.globalUsers_arrow_to_internet().end(1, landscape.lineDrawDurration),
        endUserDNSLineAnimations(landscape, 1, landscape.lineDrawDurration, true),
        landscape.highlight(landscape.internet.ref),
        endUserServerLineAnimations(landscape, 1, landscape.lineDrawDurration, true),
        waitFor(.25),
        all(
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az1().opacity(.2, landscape.lineDrawDurration),
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az2().opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Web_az1_arrow_to_ec2Application_az1().opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Web_az2_arrow_to_ec2Application_az2().opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az1_arrow_to_rds_az1().opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az2_arrow_to_rds_az2().opacity(.2, landscape.lineDrawDurration),
            landscape.rdsSubnet.arrow_rds_az1_to_rds_az2().opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az1_arrow_to_vpcEndpoint()?.opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az2_arrow_to_vpcEndpoint()?.opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az1_arrow_to_vpcEndpoint()?.opacity(.2, landscape.lineDrawDurration),
            landscape.ec2Application_az2_arrow_to_vpcEndpoint()?.opacity(.2, landscape.lineDrawDurration),
        ),
        landscape.highlight(landscape.vpcEndpoint?.ref),
        all(
            landscape.vpcEndpoint_arrow_to_ses()?.end(0, landscape.lineDrawDurration),
            landscape.vpcEndpoint_arrow_to_sns()?.end(0, landscape.lineDrawDurration),
            landscape.vpcEndpoint_arrow_to_kms()?.end(0, landscape.lineDrawDurration),
        ),
        waitFor(.25),
        landscape.highlight(landscape.applicationLoadBalancer.ref),
        endUserLambdaLineAnimations(landscape, 1, landscape.lineDrawDurration, true),
        all(
            landscape.vpcEndpoint_arrow_to_ses()?.end(1, landscape.lineDrawDurration),
            landscape.vpcEndpoint_arrow_to_sns()?.end(1, landscape.lineDrawDurration),
            landscape.vpcEndpoint_arrow_to_kms()?.end(1, landscape.lineDrawDurration),
        ),
        waitFor(.25),
        all(
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az1().opacity(1, landscape.lineDrawDurration),
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az2().opacity(1, landscape.lineDrawDurration),
            landscape.ec2Web_az1_arrow_to_ec2Application_az1().opacity(1, landscape.lineDrawDurration),
            landscape.ec2Web_az2_arrow_to_ec2Application_az2().opacity(1, landscape.lineDrawDurration),
            landscape.ec2Application_az1_arrow_to_rds_az1().opacity(1, landscape.lineDrawDurration),
            landscape.ec2Application_az2_arrow_to_rds_az2().opacity(1, landscape.lineDrawDurration),
            landscape.rdsSubnet.arrow_rds_az1_to_rds_az2().opacity(1, landscape.lineDrawDurration),
            landscape.ec2Application_az1_arrow_to_vpcEndpoint()?.opacity(1, landscape.lineDrawDurration),
            landscape.ec2Application_az2_arrow_to_vpcEndpoint()?.opacity(1, landscape.lineDrawDurration),
        ),
    )
}

function endUserDNSLineAnimations(landscape: TAWSLandscape, e: number, d: number, forward: boolean): ThreadGenerator {
    let animations = [
        landscape.internet_arrow_to_route53().end(e, d),
        landscape.route53_arrow_to_route53DNSFirewall().end(e, d),
        landscape.route53DNSFirewall_arrow_to_route53DNSResolver().end(e, d),
        all(
            landscape.route53DNSResolver_arrow_to_route53DNSPrivateHostedZone().end(e, d),
            landscape.route53DNSResolver_arrow_to_route53DNSPublicHostedZone().end(e, d),
        ),
    ]

    if (!forward) {
        return chain(...animations.reverse())
    }

    return chain(...animations)
}

function endUserServerLineAnimations(landscape: TAWSLandscape, e: number, d: number, forward: boolean): ThreadGenerator {
    let animations = [
        landscape.internet_arrow_to_waf().end(e, d),
        landscape.waf_arrow_to_cloudfront().end(e, d),
        all(
            landscape.cloudfront_arrow_to_internetGateway().end(e, d),
            landscape.cloudfront_arrow_to_s3().end(e, d),
        ),
        all(
            landscape.internetGateway_arrow_to_firewallEndpoint_az1().end(e, d),
            landscape.internetGateway_arrow_to_firewallEndpoint_az2().end(e, d),
        ),
        all(
            landscape.firewallEndpoint_az1_arrow_to_applicationLoadBalancer().end(e, d),
            landscape.firewallEndpoint_az2_arrow_to_applicationLoadBalancer().end(e, d),
        ),
        all(
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az1().end(e, d),
            landscape.applicationLoadBalancer_arrow_to_ec2Web_az2().end(e, d),
        ),
        all(
            landscape.ec2Web_az1_arrow_to_ec2Application_az1().end(e, d),
            landscape.ec2Web_az2_arrow_to_ec2Application_az2().end(e, d),
        ),
        all(
            landscape.ec2Application_az1_arrow_to_vpcEndpoint()?.end(e, d),
            landscape.ec2Application_az2_arrow_to_vpcEndpoint()?.end(e, d),
            landscape.ec2Application_az1_arrow_to_rds_az1().end(e, d),
            landscape.ec2Application_az2_arrow_to_rds_az2().end(e, d),
        ),
        all(
            landscape.vpcEndpoint_arrow_to_ses()?.end(e, d),
            landscape.vpcEndpoint_arrow_to_sns()?.end(e, d),
            landscape.vpcEndpoint_arrow_to_kms()?.end(e, d),
        ),
    ]

    if (!forward) {
        return chain(...animations.reverse())
    }

    return chain(...animations)
}

function endUserLambdaLineAnimations(landscape: TAWSLandscape, e: number, d: number, forward: boolean): ThreadGenerator {
    let animations = [
        // Reset the highlight circle

        all(
            landscape.applicationLoadBalancer_arrow_to_apiGateway_az1().end(e, d),
            landscape.applicationLoadBalancer_arrow_to_apiGateway_az2().end(e, d),
        ),
        all(
            landscape.apiGateway_az1_arrow_to_vpcEndpoint().end(e, d),
            landscape.apiGateway_az2_arrow_to_vpcEndpoint().end(e, d),
        ),

        landscape.vpcEndpoint_arrow_to_lambda()?.end(e, d),
        landscape.lambda_arrow_to_s3().end(e, d),

        all(
            landscape.lambda_arrow_to_rds_az1().end(e, d),
            landscape.lambda_arrow_to_rds_az2().end(e, d),
        ),

        landscape.lambda_arrow_to_vpcEndpoint()?.end(e,d),
    ]

    if (!forward) {
        return chain(...animations.reverse())
    }

    return chain(...animations)
}