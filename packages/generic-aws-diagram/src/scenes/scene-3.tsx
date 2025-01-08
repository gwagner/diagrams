import "./global.css";
import { makeScene2D } from "@motion-canvas/2d";
import { all, chain, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";
import { AWSLandscape, Tags, TAWSLandscape } from "../components/aws-landscape";
import { createRef } from "@motion-canvas/core/lib/utils";
import { ArrowDirection, ArrowEnds, getLineAnimationV2 } from "../utils/lines";
import { Circle } from "@motion-canvas/2d/lib/components";
import { Direction } from "@motion-canvas/core/lib/types";
import { slideTransition } from '@motion-canvas/core/lib/transitions';

// zIndex Ranges:
// 1-20: Page Elements
// 21-40: Lines

const zero: [number, number] = [-1920 / 2, -1080 / 2];
const lineDrawDurration: number = .5;
const fadeOutOpacity: number = .1;
const fadeOutDurration: number = .5;


export default makeScene2D(function* (view) {
    const landscape = createRef<TAWSLandscape>();
    view.add(
        <AWSLandscape
            ref={landscape}
            fontSize={10}
            showALB={true}
            showBackup={true}
            showCertificateManager={true}
            showCloudfront={true}
            showCloudTrail={true}
            showCloudWatch={true}
            showCodePipeline={true}
            showCognito={true}
            showConfig={true}
            showCostManagement={true}
            showEC2App={true}
            showEC2Web={true}
            showFirewallEndpoint={true}
            showFirewallManager={true}
            showGlobalUsers={true}
            showGuardDuty={true}
            showIngress={true}
            showInternet={true}
            showInternetGateway={true}
            showInspector={true}
            showKMS={true}
            showLambda={true}
            showManagementConsole={true}
            showNetworkFirewall={true}
            showRDS={true}
            showRoute53={true}
            showS3={true}
            showSecretsManager={true}
            showSecurityHub={true}
            showSES={true}
            showSNS={true}
            showSystemsManager={true}
            showVPCEndpoint={false}
            showWAF={true}
            showXRay={true}
            subnetHeight={220}
        />
    );
    landscape().setupLines(view);
    landscape().getRefsByTags([Tags.EndUser])

    // Disable some specific
    // landscape().apiGateway_az1_arrow_to_lambda().opacity(0)
    // landscape().apiGateway_az2_arrow_to_lambda().opacity(0)

    // Set all lines to 0
    yield* waitFor(1);
    yield* landscape().endUserHTTPSLowLightAnimation();
    yield* landscape().endUserHTTPSRewindAnimation();
    yield* landscape().endUserHTTPSFlowAnimation();

    // const rdsPrimary_to_rdsSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().rdsPrimary, startEdge: ArrowDirection.Bottom, end: landscape().rdsSecondary, endEdge: ArrowDirection.Top, dashed: true })
    // const ec2AppPrimary_to_rdsPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().ec2AppPrimary, startEdge: ArrowDirection.Right, end: landscape().rdsPrimary, endEdge: ArrowDirection.Left })
    // const ec2AppSecondary_to_rdsSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().ec2AppSecondary, startEdge: ArrowDirection.Right, end: landscape().rdsSecondary, endEdge: ArrowDirection.Left, dashed: true })

    // const ec2WebPrimary_to_ec2AppPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().ec2WebPrimary, startEdge: ArrowDirection.Right, end: landscape().ec2AppPrimary, endEdge: ArrowDirection.Left })
    // const ec2WebSecondary_to_ec2AppSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().ec2WebSecondary, startEdge: ArrowDirection.Right, end: landscape().ec2AppSecondary, endEdge: ArrowDirection.Left, dashed: true })

    // const firewallEndpointPrimary_to_elasticLoadBalancer_Arrow = getLineAnimationV2({ view: view, start: landscape().firewallEndpointPrimary, startEdge: ArrowDirection.Right, end: landscape().applicationLoadBalancer, endEdge: ArrowDirection.Top, numPoints: 3 })
    // const firewallEndpointSecondary_to_elasticLoadBalancer_Arrow = getLineAnimationV2({ view: view, start: landscape().firewallEndpointSecondary, startEdge: ArrowDirection.Right, end: landscape().applicationLoadBalancer, endEdge: ArrowDirection.Bottom, dashed: true, numPoints: 3 })

    // const elasticLoadBalancer_to_ec2WebPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().applicationLoadBalancer, startEdge: ArrowDirection.Right, end: landscape().ec2WebPrimary, endEdge: ArrowDirection.Bottom, numPoints: 3 })
    // const elasticLoadBalancer_to_ec2WebSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().applicationLoadBalancer, startEdge: ArrowDirection.Right, end: landscape().ec2WebSecondary, endEdge: ArrowDirection.Top, dashed: true, numPoints: 3 })

    // const elasticLoadBalancer_to_apiGatewayPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().applicationLoadBalancer, startEdge: ArrowDirection.Right, startOffset: 20, end: landscape().apiGatewayPrimary, endEdge: ArrowDirection.Right, color: "#32CD32", numPoints: 3 })
    // const elasticLoadBalancer_to_apiGatewaySecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().applicationLoadBalancer, startEdge: ArrowDirection.Right, startOffset: 20, end: landscape().apiGatewaySecondary, endEdge: ArrowDirection.Right, color: "#32CD32", dashed: true, numPoints: 3 })

    // const elasticLoadBalancer_to_certManager_Arrow = getLineAnimationV2({ view: view, start: landscape().applicationLoadBalancer, startEdge: ArrowDirection.Bottom, end: landscape().certificateManager, endEdge: ArrowDirection.Top, color: "#FE7F9C", numPoints: 3 })

    // const internetGateway_to_firewallPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().internetGateway, startEdge: ArrowDirection.Right, end: landscape().firewallEndpointPrimary, endEdge: ArrowDirection.Bottom, numPoints: 3 })
    // const internetGateway_to_firewallSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().internetGateway, startEdge: ArrowDirection.Right, end: landscape().firewallEndpointSecondary, endEdge: ArrowDirection.Top, dashed: true, numPoints: 3 })

    // const cloudfront_to_internetGateway_Arrow = getLineAnimationV2({ view: view, start: landscape().cloudfront, startEdge: ArrowDirection.Right, end: landscape().internetGateway, endEdge: ArrowDirection.Left })
    // const cloudfront_to_s3Bucket_Arrow = getLineAnimationV2({ view: view, start: landscape().cloudfront, startEdge: ArrowDirection.Bottom, end: landscape().s3Bucket, endEdge: ArrowDirection.Top })
    // const cloudfront_to_certManager_Arrow = getLineAnimationV2({ view: view, start: landscape().cloudfront, startEdge: ArrowDirection.Bottom, end: landscape().certificateManager, endEdge: ArrowDirection.Top, color: "#FE7F9C", numPoints: 3 })
    // const s3_to_certManager_Arrow = getLineAnimationV2({ view: view, start: landscape().s3Bucket, startEdge: ArrowDirection.Right, end: landscape().certificateManager, endEdge: ArrowDirection.Left, color: "#FE7F9C" })

    // const waf_to_cloudfront_Arrow = getLineAnimationV2({ view: view, start: landscape().waf, startEdge: ArrowDirection.Right, end: landscape().cloudfront, endEdge: ArrowDirection.Left })

    // const waf_to_certManager_Arrow = getLineAnimationV2({ view: view, start: landscape().waf, startEdge: ArrowDirection.Bottom, end: landscape().certificateManager, endEdge: ArrowDirection.Top, color: "#FE7F9C", numPoints: 3 })

    // const internet_to_waf_Arrow = getLineAnimationV2({ view: view, start: landscape().internet, startEdge: ArrowDirection.Right, end: landscape().waf, endEdge: ArrowDirection.Left, numPoints: 3 })

    // const internet_to_route53_Arrow = getLineAnimationV2({ view: view, start: landscape().internet, startEdge: ArrowDirection.Top, end: landscape().route53, endEdge: ArrowDirection.Left, color: "#FFAC1C", numPoints: 3 })
    // const route53_to_dnsFirewall_Arrow = getLineAnimationV2({ view: view, start: landscape().route53, startEdge: ArrowDirection.Top, end: landscape().route53DNSFirewall, endEdge: ArrowDirection.Bottom, color: "#FFAC1C" })
    // const dnsFirewall_to_resolver_Arrow = getLineAnimationV2({ view: view, start: landscape().route53DNSFirewall, startEdge: ArrowDirection.Right, end: landscape().route53DNSResolver, endEdge: ArrowDirection.Bottom, color: "#FFAC1C" , numPoints: 3})
    // const resolver_to_publicZone_Arrow = getLineAnimationV2({ view: view, start: landscape().route53DNSResolver, startEdge: ArrowDirection.Left, end: landscape().route53DNSPublicHostedZone, endEdge: ArrowDirection.Right, color: "#FFAC1C" })
    // const resolver_to_privateZone_Arrow = getLineAnimationV2({ view: view, start: landscape().route53DNSResolver, startEdge: ArrowDirection.Top, startOffset: -76, end: landscape().route53DNSPrivateHostedZone, endEdge: ArrowDirection.Top, dashed: true, color: "#FFAC1C", numPoints: 3 })

    // const globalUsers_to_internet_Arrow = getLineAnimationV2({ view: view, start: landscape().globalUsers, startEdge: ArrowDirection.Right, end: landscape().internet, endEdge: ArrowDirection.Left })

    // const developers_to_codeCommit_Arrow = getLineAnimationV2({ view: view, start: landscape().developers, startEdge: ArrowDirection.Right, end: landscape().codeCommit, endEdge: ArrowDirection.Left, color: "#FFEA00", numPoints: 3})
    // const codeCommit_to_codeBuild_Arrow = getLineAnimationV2({ view: view, start: landscape().codeCommit, startEdge: ArrowDirection.Right, end: landscape().codeBuild, endEdge: ArrowDirection.Left, color: "#FFEA00"})
    // const codeBuild_to_codeDeploy_Arrow = getLineAnimationV2({ view: view, start: landscape().codeBuild, startEdge: ArrowDirection.Bottom, end: landscape().codeDeploy, endEdge: ArrowDirection.Top, color: "#FFEA00"})
    // const codeDeploy_to_codePipeline_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Left, end: landscape().codePipeline, endEdge: ArrowDirection.Right, color: "#FFEA00"})
    // const codeDeploy_to_managementConsole_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Bottom,  end: landscape().managementConsole, endEdge: ArrowDirection.Left, color: "#FFEA00", numPoints: 3})

    // const codeDeploy_to_ec2WebPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().ec2WebPrimary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})
    // const codeDeploy_to_ec2WebSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().ec2WebSecondary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})
    // const codeDeploy_to_ec2AppPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().ec2AppPrimary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})
    // const codeDeploy_to_ecAppSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().ec2AppSecondary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})
    // const codeDeploy_to_rdsPrimary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().rdsPrimary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})
    // const codeDeploy_to_rdsSecondary_Arrow = getLineAnimationV2({ view: view, start: landscape().codeDeploy, startEdge: ArrowDirection.Right, startOffset: 30,  end: landscape().rdsSecondary, endEdge: ArrowDirection.Bottom, color: "#FFEA00", numPoints: 3})

    // const codePipeline_to_codeCommit_Arrow = getLineAnimationV2({ view: view, start: landscape().codePipeline, startEdge: ArrowDirection.Top, end: landscape().codeCommit, endEdge: ArrowDirection.Bottom, color: "#FFEA00"})

    // const management_to_vpcEndpoint_Arrow = getLineAnimationV2({ view: view, start: landscape().vpcEndpoint, startEdge: ArrowDirection.Bottom, startOffset: 38, end: landscape().management, endEdge: ArrowDirection.Top, arrowEnds: ArrowEnds.Both, numPoints: 3})

    // const apiGatewayPrimary_to_lambda_Arrow = getLineAnimationV2({ view: view, start: landscape().apiGatewayPrimary, startEdge: ArrowDirection.Left, startOffset: -20, end: landscape().lambda, endEdge: ArrowDirection.Right, color: "#32CD32", numPoints: 3})
    // const apiGatewaySecondary_to_lambda_Arrow = getLineAnimationV2({ view: view, start: landscape().apiGatewaySecondary, startEdge: ArrowDirection.Left, startOffset: -20, end: landscape().lambda, endEdge: ArrowDirection.Right, color: "#32CD32", dashed: true, numPoints: 3})

    // yield* slideTransition(Direction.Left);

    // yield* all(
    //     // Internet to Application Flow
    //     // rdsPrimary_to_rdsSecondary_Arrow().end(1, 0),
    //     // ec2AppPrimary_to_rdsPrimary_Arrow().end(1, 0),
    //     // ec2AppSecondary_to_rdsSecondary_Arrow().end(1, 0),
    //     // ec2WebPrimary_to_ec2AppPrimary_Arrow().end(1, 0),
    //     // ec2WebSecondary_to_ec2AppSecondary_Arrow().end(1, 0),
    //     // firewallEndpointPrimary_to_elasticLoadBalancer_Arrow().end(1, 0),
    //     // firewallEndpointSecondary_to_elasticLoadBalancer_Arrow().end(1, 0),
    //     // elasticLoadBalancer_to_ec2WebPrimary_Arrow().end(1, 0),
    //     // elasticLoadBalancer_to_ec2WebSecondary_Arrow().end(1, 0),
    //     // internetGateway_to_firewallPrimary_Arrow().end(1, 0),
    //     // internetGateway_to_firewallSecondary_Arrow().end(1, 0),
    //     // cloudfront_to_internetGateway_Arrow().end(1, 0),
    //     // cloudfront_to_s3Bucket_Arrow().end(1, 0),
    //     // waf_to_cloudfront_Arrow().end(1, 0),
    //     // internet_to_waf_Arrow().end(1, 0),
    //     // globalUsers_to_internet_Arrow().end(1, 0),
    //     // internet_to_route53_Arrow().end(1, 0),
    //     // route53_to_dnsFirewall_Arrow().end(1, 0),
    //     // dnsFirewall_to_resolver_Arrow().end(1, 0),
    //     // resolver_to_publicZone_Arrow().end(1, 0),
    //     // resolver_to_privateZone_Arrow().end(1, 0),

    //     developers_to_codeCommit_Arrow().end(1, 0),
    //     codeCommit_to_codeBuild_Arrow().end(1,0),
    //     codeBuild_to_codeDeploy_Arrow().end(1,0),
    //     codeDeploy_to_codePipeline_Arrow().end(1,0),
    //     codeDeploy_to_managementConsole_Arrow().end(1,0),
    //     codePipeline_to_codeCommit_Arrow().end(1,0),
    //     waf_to_certManager_Arrow().end(1,0),
    //     cloudfront_to_certManager_Arrow().end(1,0),
    //     s3_to_certManager_Arrow().end(1,0),
    //     elasticLoadBalancer_to_certManager_Arrow().end(1,0),
    //     management_to_vpcEndpoint_Arrow().end(1,0),
    //     codeDeploy_to_ec2WebPrimary_Arrow().end(1,0),
    //     codeDeploy_to_ec2WebSecondary_Arrow().end(1,0),
    //     codeDeploy_to_ec2AppPrimary_Arrow().end(1,0),
    //     codeDeploy_to_ecAppSecondary_Arrow().end(1,0),
    //     codeDeploy_to_rdsPrimary_Arrow().end(1,0),
    //     codeDeploy_to_rdsSecondary_Arrow().end(1,0),
    //     //apiGatewayPrimary_to_lambda_Arrow().end(1,0),
    //     //apiGatewaySecondary_to_lambda_Arrow().end(1,0),
    // )

    // yield* all(
    //     landscape().natGatewayPrimary().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     //landscape().apiGatewayPrimary().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().natGatewaySecondary().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     //landscape().apiGatewaySecondary().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().certificateManager().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().cognito().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     //landscape().lambda().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().codeBuild().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().codeCommit().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().codeDeploy().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().codePipeline().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().developers().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     developers_to_codeCommit_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeCommit_to_codeBuild_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeBuild_to_codeDeploy_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_codePipeline_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_managementConsole_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codePipeline_to_codeCommit_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     waf_to_certManager_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     cloudfront_to_certManager_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     s3_to_certManager_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     elasticLoadBalancer_to_certManager_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().vpcEndpoint().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     management_to_vpcEndpoint_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     landscape().management().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_ec2WebPrimary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_ec2WebSecondary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_ec2AppPrimary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_ecAppSecondary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_rdsPrimary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     codeDeploy_to_rdsSecondary_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     //apiGatewayPrimary_to_lambda_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),
    //     //apiGatewaySecondary_to_lambda_Arrow().opacity(1, 0).to(fadeOutOpacity, fadeOutDurration),

    //     // Internet to Application Flow
    //     // landscape().globalUsers().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().internet().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().waf().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().route53().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().route53DNSResolver().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().route53DNSFirewall().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().route53DNSPrivateHostedZone().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().route53DNSPublicHostedZone().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().cloudfront().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().internetGateway().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().s3Bucket().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().firewallEndpointPrimary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().firewallEndpointSecondary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().applicationLoadBalancer().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().ec2AppPrimary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().ec2AppSecondary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().ec2WebPrimary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().ec2WebSecondary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().rdsPrimary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // landscape().rdsSecondary().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // globalUsers_to_internet_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // internet_to_route53_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // route53_to_dnsFirewall_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // dnsFirewall_to_resolver_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // resolver_to_privateZone_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // resolver_to_publicZone_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // internet_to_waf_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // waf_to_cloudfront_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // cloudfront_to_s3Bucket_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // cloudfront_to_internetGateway_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // internetGateway_to_firewallPrimary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // internetGateway_to_firewallSecondary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // firewallEndpointPrimary_to_elasticLoadBalancer_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // firewallEndpointSecondary_to_elasticLoadBalancer_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // elasticLoadBalancer_to_ec2WebPrimary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // elasticLoadBalancer_to_ec2WebSecondary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // ec2WebPrimary_to_ec2AppPrimary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // ec2WebSecondary_to_ec2AppSecondary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // ec2AppPrimary_to_rdsPrimary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // ec2AppSecondary_to_rdsSecondary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    //     // rdsPrimary_to_rdsSecondary_Arrow().opacity(1,0).to(fadeOutOpacity, fadeOutDurration),
    // )


    // yield* chain(
    //     highlightCircle().scale(1, 0).to(2, lineDrawDurration).to(1, lineDrawDurration).to(2, lineDrawDurration).to(1, lineDrawDurration),
    //     highlightCircle().opacity(1, 0).to(0, lineDrawDurration),
    //     ()=>highlightCircle().remove(),
    // )
    // yield* all(globalUsers_to_internet_Arrow().end(1, lineDrawDurration))
    // yield* all(internet_to_route53_Arrow().end(1, lineDrawDurration))
    // yield* all(route53_to_dnsFirewall_Arrow().end(1, lineDrawDurration))
    // yield* all(dnsFirewall_to_resolver_Arrow().end(1, lineDrawDurration))
    // yield* all(resolver_to_publicZone_Arrow().end(1, lineDrawDurration), resolver_to_privateZone_Arrow().end(1, lineDrawDurration))
    // yield* all(internet_to_waf_Arrow().end(1, lineDrawDurration))
    // yield* all(waf_to_cloudfront_Arrow().end(1, lineDrawDurration))
    // yield* all(cloudfront_to_s3Bucket_Arrow().end(1, lineDrawDurration), cloudfront_to_internetGateway_Arrow().end(1, lineDrawDurration))
    // yield* all(internetGateway_to_firewallPrimary_Arrow().end(1, lineDrawDurration), internetGateway_to_firewallSecondary_Arrow().end(1, lineDrawDurration))
    // yield* all(firewallEndpointPrimary_to_elasticLoadBalancer_Arrow().end(1, lineDrawDurration), firewallEndpointSecondary_to_elasticLoadBalancer_Arrow().end(1, lineDrawDurration))
    // yield* all(
    //     elasticLoadBalancer_to_ec2WebPrimary_Arrow().end(1, lineDrawDurration), 
    //     elasticLoadBalancer_to_ec2WebSecondary_Arrow().end(1, lineDrawDurration),
    //     elasticLoadBalancer_to_apiGatewayPrimary_Arrow().end(1, lineDrawDurration),
    //     elasticLoadBalancer_to_apiGatewaySecondary_Arrow().end(1, lineDrawDurration),
    // )
    // yield* all(
    //     ec2WebPrimary_to_ec2AppPrimary_Arrow().end(1, lineDrawDurration), 
    //     ec2WebSecondary_to_ec2AppSecondary_Arrow().end(1, lineDrawDurration),
    //     apiGatewayPrimary_to_lambda_Arrow().end(1,lineDrawDurration),
    //     apiGatewaySecondary_to_lambda_Arrow().end(1,lineDrawDurration),
    // )
    // yield* all(ec2AppPrimary_to_rdsPrimary_Arrow().end(1, lineDrawDurration), ec2AppSecondary_to_rdsSecondary_Arrow().end(1, lineDrawDurration))
    // yield* all(rdsPrimary_to_rdsSecondary_Arrow().end(1, lineDrawDurration))

    yield* waitFor(2);
});