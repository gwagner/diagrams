import { Circle, Line, Rect, Shape, View2D } from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef, Reference, useLogger } from "@motion-canvas/core/lib/utils";
import { ComponentHelpers, ComponentHelpersProps } from "valewood-components/component-helpers";
import { ApplicationLoadBalancerRef } from "./aws-landscape-references/application-load-balancer";
import { EC2WebSubnetRef } from "./aws-landscape-references/ec2-web-subnet";
import { TransitSubnetRef } from "./aws-landscape-references/transit-subnet";
import { FirewallEndpointSubnetRef } from "./aws-landscape-references/firewall-endpoint-subnet";
import { ElasticLoadBalancerRef } from "./aws-landscape-references/elastic-load-balancer";
import { InternetGatewayRef } from "./aws-landscape-references/internet-gateway";
import { EC2ApplicationSubnetRef } from "./aws-landscape-references/ec2-application-subnet";
import { RDSSubnetRef } from "./aws-landscape-references/rds-subnet";
import { WAFRef } from "./aws-landscape-references/waf";
import { CloudFrontRef } from "./aws-landscape-references/cloudfront";
import { VPCEndpointRef } from "./aws-landscape-references/vpc-endpoint";
import { UsersRef } from "./aws-landscape-references/users";
import { InternetRef } from "./aws-landscape-references/internet";
import { SimpleStorageServiceRef } from "./aws-landscape-references/simple-storage-service";
import { CertificateManagerRef } from "./aws-landscape-references/certificate-manager";
import { CognitoRef } from "./aws-landscape-references/cognito";
import { LambdaRef } from "./aws-landscape-references/lambda";
import { KeyManagementServiceRef } from "./aws-landscape-references/key-management-service";
import { BackupRef } from "./aws-landscape-references/backup";
import { CloudtrailRef } from "./aws-landscape-references/cloudtrail";
import { CloudWatchRef } from "./aws-landscape-references/cloudwatch";
import { ConfigRef } from "./aws-landscape-references/config";
import { CostManagementRef } from "./aws-landscape-references/cost-management";
import { FirewallManagerRef } from "./aws-landscape-references/firewall-manager";
import { GuardDutyRef } from "./aws-landscape-references/guard-duty";
import { ManagementConsoleRef } from "./aws-landscape-references/management-console";
import { InspectorRef } from "./aws-landscape-references/inspector";
import { NetworkFirewallRef } from "./aws-landscape-references/network-firewall";
import { SecretsManagerRef } from "./aws-landscape-references/secrets-manager";
import { SecurityHubRef } from "./aws-landscape-references/security-hub";
import { SimpleEmailServiceRef } from "./aws-landscape-references/simple-email-service";
import { SystemsManagerRef } from "./aws-landscape-references/systems-manager";
import { XRayRef } from "./aws-landscape-references/x-ray";
import { SimpleNotificationServiceRef } from "./aws-landscape-references/simple-notification-service";
import { CodeBuildRef } from "./aws-landscape-references/code-build";
import { CodeCommitRef } from "./aws-landscape-references/code-commit";
import { CodePipelineRef } from "./aws-landscape-references/code-pipeline";
import { CodeDeployRef } from "./aws-landscape-references/code-deploy";
import { Route53Ref } from "./aws-landscape-references/route53";
import { Route53HostedZoneRef } from "./aws-landscape-references/route53-hosted-zone";
import { Route53DNSResolverRef } from "./aws-landscape-references/route53-dns-resolver";
import { Route53DNSFirewallRef } from "./aws-landscape-references/route53-dns-firewall";
import { Container } from "./aws-landscape-containers/container";
import { Arrow } from "../../../components/arrow/arrow";
import { Arrow as ArrowComponent } from "../../../components/arrow/line";
import { endUserHTTPSFlow, endUserHTTPSFlowRewind, endUserHTTPSLowLight } from "./aws-landscape-flows/end-user-https";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { chain } from "@motion-canvas/core/lib/flow";
import { DevelopersRef } from "./aws-landscape-references/developers";
import { FakeLine } from "./fake-line";

export interface AWSLandscapeProps extends ComponentHelpersProps {
    showALB?: boolean;
    showBackup?: boolean;
    showCertificateManager?: boolean;
    showCloudfront?: boolean;
    showCloudTrail?: boolean;
    showCloudWatch?: boolean;
    showCodePipeline?: boolean;
    showCognito?: boolean;
    showConfig?: boolean;
    showCostManagement?: boolean;
    showEC2Web?: boolean;
    showEC2App?: boolean;
    showELB?: boolean;
    showFirewallEndpoint?: boolean;
    showFirewallManager?: boolean;
    showGlobalUsers?: boolean;
    showGuardDuty?: boolean;
    showIngress?: boolean;
    showInternet?: boolean;
    showInternetGateway?: boolean;
    showInspector?: boolean;
    showKMS?: boolean;
    showLambda?: boolean;
    showManagementConsole?: boolean;
    showNetworkFirewall?: boolean;
    showRDS?: boolean;
    showRoute53?: boolean;
    showS3?: boolean;
    showSecretsManager?: boolean;
    showSecurityHub?: boolean;
    showSES?: boolean;
    showSNS?: boolean;
    showSystemsManager?: boolean;
    showVPCEndpoint?: boolean;
    showWAF?: boolean;
    showXRay?: boolean;
    subnetHeight?: SignalValue<number>;
}

const AWSLandscapeProxy = (target: TAWSLandscape) => {
    return new Proxy(target, {
        get: function(landscape: TAWSLandscape, field: keyof TAWSLandscape, receiver: any) {

            if (field in landscape && typeof landscape[field] == "function") return Reflect.get(landscape, field, receiver); // return a function
            if (field in landscape) return landscape[field]; // normal case

            // Component does not exist case
            const ref = createRef<FakeLine>();
            (<FakeLine ref={ref} points={[[0,0], [0,0]]} start={0} end={0}/>)
            return ref
        }
    })
}

interface LineNames {
    apiGateway_az1_arrow_to_lambda: Reference<Line>;
    apiGateway_az2_arrow_to_lambda: Reference<Line>;
    apiGateway_az1_arrow_to_certificateManager: Reference<Line>;
    apiGateway_az2_arrow_to_certificateManager: Reference<Line>;
    apiGateway_az1_arrow_to_vpcEndpoint?: Reference<Line>;
    apiGateway_az2_arrow_to_vpcEndpoint?: Reference<Line>;
    applicationLoadBalancer_arrow_to_ec2Web_az1: Reference<Line>;
    applicationLoadBalancer_arrow_to_ec2Web_az2: Reference<Line>;
    applicationLoadBalancer_arrow_to_apiGateway_az1: Reference<Line>;
    applicationLoadBalancer_arrow_to_apiGateway_az2: Reference<Line>;
    applicationLoadBalancer_arrow_to_certManager: Reference<Line>;
    cloudfront_arrow_to_certificateManager: Reference<Line>;
    cloudfront_arrow_to_internetGateway: Reference<Line>;
    cloudfront_arrow_to_s3: Reference<Line>;
    ec2Web_az1_arrow_to_ec2Application_az1: Reference<Line>;
    ec2Web_az2_arrow_to_ec2Application_az2: Reference<Line>;
    ec2Application_az1_arrow_to_rds_az1: Reference<Line>;
    ec2Application_az2_arrow_to_rds_az2: Reference<Line>;
    ec2Application_az1_arrow_to_vpcEndpoint: Reference<Line>;
    ec2Application_az2_arrow_to_vpcEndpoint: Reference<Line>;
    firewallEndpoint_az1_arrow_to_applicationLoadBalancer: Reference<Line>;
    firewallEndpoint_az2_arrow_to_applicationLoadBalancer: Reference<Line>;
    globalUsers_arrow_to_internet: Reference<Line>;
    internet_arrow_to_waf: Reference<Line>;
    internet_arrow_to_route53: Reference<Line>;
    internetGateway_arrow_to_firewallEndpoint_az1: Reference<Line>;
    internetGateway_arrow_to_firewallEndpoint_az2: Reference<Line>;
    lambda_arrow_to_s3: Reference<Line>;
    lambda_arrow_to_rds_az1: Reference<Line>;
    lambda_arrow_to_rds_az2: Reference<Line>;
    lambda_arrow_to_vpcEndpoint: Reference<Line>;
    route53_arrow_to_route53DNSFirewall: Reference<Line>;
    route53DNSFirewall_arrow_to_route53DNSResolver: Reference<Line>;
    route53DNSResolver_arrow_to_route53DNSPublicHostedZone: Reference<Line>;
    route53DNSResolver_arrow_to_route53DNSPrivateHostedZone: Reference<Line>;
    vpcEndpoint_arrow_to_lambda: Reference<Line>;
    vpcEndpoint_arrow_to_ses: Reference<Line>;
    vpcEndpoint_arrow_to_sns: Reference<Line>;
    vpcEndpoint_arrow_to_kms: Reference<Line>;
    waf_arrow_to_certificateManager: Reference<Line>;
    waf_arrow_to_cloudfront: Reference<Line>;
}

export enum Tags {
    Configurable  = 1,
    Developer,
    Egress,
    EndUser,
    Management
}

export class AWSLandscape extends ComponentHelpers {

    protected linesReferences: Reference<ArrowComponent>[] = [];
    protected componentReferences:  Reference<any>[] = [];

    public applicationLoadBalancer: ApplicationLoadBalancerRef;
    public backup: BackupRef;
    public certificateManager: CertificateManagerRef;
    public cloudfront: CloudFrontRef;
    public cloudTrail: CloudtrailRef;
    public cloudWatch: CloudWatchRef;
    public codeBuild: CodeBuildRef;
    public codeCommit: CodeCommitRef;
    public codeDeploy: CodeDeployRef;
    public codePipeline: CodePipelineRef;
    public cognito: CognitoRef;
    public config: ConfigRef;
    public costManagement: CostManagementRef;
    public developmentUsers: DevelopersRef;
    public ec2ApplicationSubnet: EC2ApplicationSubnetRef;
    public ec2WebSubnet: EC2WebSubnetRef;
    public elasticLoadBalancer: ElasticLoadBalancerRef;
    public firewallEndpointSubnet: FirewallEndpointSubnetRef;
    public firewallManager: FirewallManagerRef;
    public globalUsers: UsersRef;
    public guardDuty: GuardDutyRef;
    public inspector: InspectorRef;
    public internet: InternetRef;
    public internetGateway: InternetGatewayRef;
    public kms: KeyManagementServiceRef;
    public lambda: LambdaRef;
    public managementConsole: ManagementConsoleRef;
    public networkFirewall: NetworkFirewallRef;
    public rdsSubnet: RDSSubnetRef;
    public route53: Route53Ref;
    public route53DNSFirewall: Route53DNSFirewallRef;
    public route53DNSPublicHostedZone: Route53HostedZoneRef;
    public route53DNSPrivateHostedZone: Route53HostedZoneRef;
    public route53DNSResolver: Route53DNSResolverRef;
    public s3: SimpleStorageServiceRef;
    public secretsManager: SecretsManagerRef;
    public securityHub: SecurityHubRef;
    public ses: SimpleEmailServiceRef;
    public sns: SimpleNotificationServiceRef;
    public systemsManager: SystemsManagerRef;
    public transitSubnet: TransitSubnetRef;
    public vpcEndpoint: VPCEndpointRef;
    public waf: WAFRef;
    public xRay: XRayRef;

    @initial(200)
    @signal()
    public declare readonly subnetHeight: SimpleSignal<number, this>;

    public readonly lineDrawDurration: number = .5;

    public readonly world = createRef<Container>();
    public readonly worldRows: Reference<Rect>[];
    public readonly awsAccount = createRef<Rect>();
    public readonly awsAccountRows: Reference<Rect>[];
    public readonly vpc = createRef<Rect>();
    public readonly availabilityZone1 = createRef<Rect>();
    public readonly availabilityZoneCenterChannel = createRef<Rect>();
    public readonly availabilityZone2 = createRef<Rect>();
    public readonly vpcServiceRows: Reference<Rect>[];
    public readonly management = createRef<Rect>();

    protected readonly highlightCircle = createRef<Circle>();

    public constructor(props?: AWSLandscapeProps) {
        super({
            ...props,
        });

        let logger = useLogger();

        this.position([0, 0]);
        this.layout(true);

        this.add(
            <Container
                ref={this.world}
                fill={"#FFFFFF"}
                stroke={"#355E3B"}
                lineWidth={2}
                justifyContent={"end"}
                composition={[7, 1]}
            />
        );
        this.worldRows = this.world().rowRefs[0];
        this.awsAccount = this.world().colRefs[1];
        this.awsAccount().stroke("#000")
        this.awsAccount().lineWidth(1)
        this.awsAccount().margin(16)

        // Add the AWS Account to the World

        const vpcContainer = createRef<Container>();
        this.awsAccount().add(<Container ref={vpcContainer} composition={[2]} />);
        this.management = vpcContainer().rowRefs[0][1];

        const vpcParts = createRef<Container>();
        vpcContainer().rowRefs[0][0]().add(<Container ref={vpcParts} composition={[7, 1]} />);
        this.awsAccountRows = vpcParts().rowRefs[0];
        this.vpc = vpcParts().colRefs[1];
        this.vpc().stroke("#000")
        this.vpc().lineWidth(1)

        const azParts = createRef<Container>();
        this.vpc().add(<Container ref={azParts} composition={[3, 7]} />);
        this.availabilityZone1 = azParts().rowRefs[0][0];
        this.availabilityZone1().stroke("#000")
        this.availabilityZone1().lineWidth(1)

        this.availabilityZoneCenterChannel = azParts().rowRefs[0][1];
        this.availabilityZone2 = azParts().rowRefs[0][2];
        this.availabilityZone2().stroke("#000")
        this.availabilityZone2().lineWidth(1)

        this.vpcServiceRows = azParts().rowRefs[1];

        // this.setupContainerLabels()

        if (props.showVPCEndpoint) {
            this.vpcEndpoint = new VPCEndpointRef(props);
            this.componentReferences.push(...this.vpcEndpoint.componentRefs)
            this.vpcServiceRows[6]().add(this.vpcEndpoint.setup());
        }

        // Thsese are in a specific order to deal with layering.  Unless you want to deal with setting a bunch of zIndex information, do not reorder this section
        if (props.showFirewallEndpoint) {
            this.firewallEndpointSubnet = new FirewallEndpointSubnetRef(props);
            this.componentReferences.push(...this.firewallEndpointSubnet.componentRefs)
            this.availabilityZone1().add(this.firewallEndpointSubnet.setupAZ1());
            this.availabilityZone2().add(this.firewallEndpointSubnet.setupAZ2());
        }

        if (props.showIngress) {
            this.transitSubnet = new TransitSubnetRef(props);
            this.componentReferences.push(...this.transitSubnet.componentRefs)
            this.availabilityZone1().add(this.transitSubnet.setupAZ1());
            this.availabilityZone2().add(this.transitSubnet.setupAZ2());
        }

        if (props.showEC2Web) {
            this.ec2WebSubnet = new EC2WebSubnetRef(props);
            this.componentReferences.push(...this.ec2WebSubnet.componentRefs)
            this.availabilityZone1().add(this.ec2WebSubnet.setupAZ1());
            this.availabilityZone2().add(this.ec2WebSubnet.setupAZ2());
        }

        if (props.showEC2App) {
            this.ec2ApplicationSubnet = new EC2ApplicationSubnetRef(props);
            this.componentReferences.push(...this.ec2ApplicationSubnet.componentRefs)
            this.availabilityZone1().add(this.ec2ApplicationSubnet.setupAZ1());
            this.availabilityZone2().add(this.ec2ApplicationSubnet.setupAZ2());
        }

        if (props.showRDS) {
            this.rdsSubnet = new RDSSubnetRef(props);
            this.componentReferences.push(...this.rdsSubnet.componentRefs)
            this.availabilityZone1().add(this.rdsSubnet.setupAZ1());
            this.availabilityZone2().add(this.rdsSubnet.setupAZ2());
        }

        if (props.showALB) {
            this.applicationLoadBalancer = new ApplicationLoadBalancerRef(props);
            this.componentReferences.push(...this.applicationLoadBalancer.componentRefs)
            this.availabilityZoneCenterChannel().add(this.applicationLoadBalancer.setup());
        }

        if (props.showELB) {
            this.elasticLoadBalancer = new ElasticLoadBalancerRef(props);
            this.componentReferences.push(...this.elasticLoadBalancer.componentRefs)
            this.availabilityZoneCenterChannel().add(this.elasticLoadBalancer.setup());
        }

        if (props.showWAF) {
            this.waf = new WAFRef(props);
            this.componentReferences.push(...this.waf.componentRefs)
            this.awsAccountRows[3]().add(this.waf.setup());
        }

        if (props.showCloudfront) {
            this.cloudfront = new CloudFrontRef(props);
            this.componentReferences.push(...this.cloudfront.componentRefs)
            this.awsAccountRows[3]().add(this.cloudfront.setup());
        }

        if (props.showInternetGateway) {
            this.internetGateway = new InternetGatewayRef(props);
            this.componentReferences.push(...this.internetGateway.componentRefs)
            this.awsAccountRows[3]().add(this.internetGateway.setup());
        }

        if (props.showGlobalUsers) {
            this.globalUsers = new UsersRef(props);
            this.componentReferences.push(...this.globalUsers.componentRefs)
            this.worldRows[3]().add(this.globalUsers.setup());
        }
        if (props.showInternet) {
            this.internet = new InternetRef(props);
            this.componentReferences.push(...this.internet.componentRefs)
            this.worldRows[3]().add(this.internet.setup());
        }
        if (props.showS3) {
            this.s3 = new SimpleStorageServiceRef(props);
            this.componentReferences.push(...this.s3.componentRefs)
            this.awsAccountRows[4]().add(this.s3.setup());
        }
        if (props.showCertificateManager) {
            this.certificateManager = new CertificateManagerRef(props);
            this.componentReferences.push(...this.certificateManager.componentRefs)
            this.awsAccountRows[4]().add(this.certificateManager.setup());
        }
        if (props.showRoute53) {
            this.route53 = new Route53Ref(props);
            this.componentReferences.push(...this.route53.componentRefs)
            this.awsAccountRows[2]().add(this.route53.setup());

            this.route53DNSFirewall = new Route53DNSFirewallRef(props);
            this.componentReferences.push(...this.route53DNSFirewall.componentRefs)
            this.awsAccountRows[1]().add(this.route53DNSFirewall.setup());

            this.route53DNSPublicHostedZone = new Route53HostedZoneRef(props);
            this.componentReferences.push(...this.route53DNSPublicHostedZone.componentRefs)
            this.awsAccountRows[0]().add(this.route53DNSPublicHostedZone.setup());

            this.route53DNSResolver = new Route53DNSResolverRef(props);
            this.componentReferences.push(...this.route53DNSResolver.componentRefs)
            this.awsAccountRows[0]().add(this.route53DNSResolver.setup());

            this.route53DNSPrivateHostedZone = new Route53HostedZoneRef(props);
            this.componentReferences.push(...this.route53DNSPrivateHostedZone.componentRefs)
            this.vpcServiceRows[0]().add(this.route53DNSPrivateHostedZone.setup());

            this.route53DNSPublicHostedZone.ref().label().text("Public Zone");
            this.route53DNSPrivateHostedZone.ref().label().text("Private Zone");
        }
        if (props.showCodePipeline) {
            this.codeBuild = new CodeBuildRef(props);
            this.componentReferences.push(...this.codeBuild.componentRefs)
            this.awsAccountRows[5]().add(this.codeBuild.setup());

            this.codeCommit = new CodeCommitRef(props);
            this.componentReferences.push(...this.codeCommit.componentRefs)
            this.awsAccountRows[5]().add(this.codeCommit.setup());

            this.codeDeploy = new CodeDeployRef(props);
            this.componentReferences.push(...this.codeDeploy.componentRefs)
            this.awsAccountRows[6]().add(this.codeDeploy.setup());

            this.codePipeline = new CodePipelineRef(props);
            this.componentReferences.push(...this.codePipeline.componentRefs)
            this.awsAccountRows[6]().add(this.codePipeline.setup());

            this.developmentUsers = new DevelopersRef(props);
            this.componentReferences.push(...this.developmentUsers.componentRefs)
            this.worldRows[6]().add(this.developmentUsers.setup());
        }
        if (props.showCognito) {
            this.cognito = new CognitoRef(props);
            this.componentReferences.push(...this.cognito.componentRefs)
            this.awsAccountRows[5]().add(this.cognito.setup());
        }
        if (props.showLambda) {
            this.lambda = new LambdaRef(props);
            this.componentReferences.push(...this.lambda.componentRefs)
            this.awsAccountRows[6]().add(this.lambda.setup());
        }

        if (props.showKMS) {
            this.kms = new KeyManagementServiceRef(props);
            this.componentReferences.push(...this.kms.componentRefs)
            this.management().add(this.kms.setup());
        }
        if (props.showBackup) {
            this.backup = new BackupRef(props);
            this.componentReferences.push(...this.backup.componentRefs)
            this.management().add(this.backup.setup());
        }
        if (props.showCloudTrail) {
            this.cloudTrail = new CloudtrailRef(props);
            this.componentReferences.push(...this.cloudTrail.componentRefs)
            this.management().add(this.cloudTrail.setup());
        }
        if (props.showCloudWatch) {
            this.cloudWatch = new CloudWatchRef(props);
            this.componentReferences.push(...this.cloudWatch.componentRefs)
            this.management().add(this.cloudWatch.setup());
        }
        if (props.showConfig) {
            this.config = new ConfigRef(props);
            this.componentReferences.push(...this.config.componentRefs)
            this.management().add(this.config.setup());
        }
        if (props.showCostManagement) {
            this.costManagement = new CostManagementRef(props);
            this.componentReferences.push(...this.costManagement.componentRefs)
            this.management().add(this.costManagement.setup());
        }
        if (props.showFirewallManager) {
            this.firewallManager = new FirewallManagerRef(props);
            this.componentReferences.push(...this.firewallManager.componentRefs)
            this.management().add(this.firewallManager.setup());
        }
        if (props.showGuardDuty) {
            this.guardDuty = new GuardDutyRef(props);
            this.componentReferences.push(...this.guardDuty.componentRefs)
            this.management().add(this.guardDuty.setup());
        }
        if (props.showManagementConsole) {
            this.managementConsole = new ManagementConsoleRef(props);
            this.componentReferences.push(...this.managementConsole.componentRefs)
            this.management().add(this.managementConsole.setup());
        }
        if (props.showInspector) {
            this.inspector = new InspectorRef(props);
            this.componentReferences.push(...this.inspector.componentRefs)
            this.management().add(this.inspector.setup());
        }
        if (props.showNetworkFirewall) {
            this.networkFirewall = new NetworkFirewallRef(props);
            this.componentReferences.push(...this.networkFirewall.componentRefs)
            this.management().add(this.networkFirewall.setup());
        }
        if (props.showSecretsManager) {
            this.secretsManager = new SecretsManagerRef(props);
            this.componentReferences.push(...this.secretsManager.componentRefs)
            this.management().add(this.secretsManager.setup());
        }
        if (props.showSecurityHub) {
            this.securityHub = new SecurityHubRef(props);
            this.componentReferences.push(...this.securityHub.componentRefs)
            this.management().add(this.securityHub.setup());
        }
        if (props.showSES) {
            this.ses = new SimpleEmailServiceRef(props);
            this.componentReferences.push(...this.ses.componentRefs)
            this.management().add(this.ses.setup());
        }
        if (props.showSNS) {
            this.sns = new SimpleNotificationServiceRef(props);
            this.componentReferences.push(...this.sns.componentRefs)
            this.management().add(this.sns.setup());
        }
        if (props.showSystemsManager) {
            this.systemsManager = new SystemsManagerRef(props);
            this.componentReferences.push(...this.systemsManager.componentRefs)
            this.management().add(this.systemsManager.setup());
        }
        if (props.showXRay) {
            this.xRay = new XRayRef(props);
            this.componentReferences.push(...this.xRay.componentRefs)
            this.management().add(this.xRay.setup());
        }

        // deal with additional positioning
        if (props.showIngress && props.showELB) {
            this.elasticLoadBalancer.ref().position(() => [
                this.transitSubnet.natGatewayAZ1.ref().parent().parent().position().x,
                0
            ]);
        }

        // deal with additional positioning
        if (props.showIngress && props.showALB) {
            this.applicationLoadBalancer.ref().position(() => [
                this.transitSubnet.natGatewayAZ1.ref().parent().parent().position().x,
                0
            ]);
        }
    }

    public setupLines(view: View2D) {

        view.add(
            <Circle
                ref={this.highlightCircle}
                stroke={"#000"}
                lineWidth={2}
                size={[90, 90]}
                opacity={0}
            />
        );

        // this.backup.drawLines(view, this)
        // this.certificateManager.drawLines(view, this)
        // this.cloudfront.drawLines(view, this)
        // this.cloudTrail.drawLines(view, this)
        // this.cloudWatch.drawLines(view, this)
        // this.codeBuild.drawLines(view, this)
        // this.codeCommit.drawLines(view, this)
        // this.codeDeploy.drawLines(view, this)
        // this.codePipeline.drawLines(view, this)
        // this.cognito.drawLines(view, this)
        // this.config.drawLines(view, this)
        // this.costManagement.drawLines(view, this)
        // this.developmentUsers.drawLines(view, this)
        // this.elasticLoadBalancer.drawLines(view, this)
        // this.guardDuty.drawLines(view, this)
        // this.inspector.drawLines(view, this)
        // this.internet.drawLines(view, this)
        // this.internetGateway.drawLines(view, this)
        // this.kms.drawLines(view, this)
        // this.lambda.drawLines(view, this)
        // this.managementConsole.drawLines(view, this)
        // this.networkFirewall.drawLines(view, this)
        // this.rdsSubnet.drawLines(view, this)
        // this.route53.drawLines(view, this)
        // this.route53DNSFirewall.drawLines(view, this)
        // this.route53DNSPublicHostedZone.drawLines(view, this)
        // this.route53DNSPrivateHostedZone.drawLines(view, this)
        // this.route53DNSResolver.drawLines(view, this)
        // this.s3.drawLines(view, this)
        // this.secretsManager.drawLines(view, this)
        // this.securityHub.drawLines(view, this)
        // this.ses.drawLines(view, this)
        // this.sns.drawLines(view, this)
        // this.systemsManager.drawLines(view, this)
        // this.transitSubnet.drawLines(view, this)
        // this.vpcEndpoint.drawLines(view, this)
        // this.waf.drawLines(view, this)
        // this.xRay.drawLines(view, this)

        if (this.globalUsers != undefined) {
            this.globalUsers.drawLines(view, this);

            let tmp: Record<string, Reference<Line>>;

            if (this.internet != undefined) {
                this.addArrow({ globalUsers_arrow_to_internet: new Arrow(this.globalUsers.ref).right().to(this.internet.ref).left().tags([Tags.EndUser]).draw(view) });
            }
        }

        if (this.internet != undefined) {
            this.internet.drawLines(view, this);

            // if (this.route53 != undefined) {
            //     this.addArrow({ internet_arrow_to_route53: new Arrow(this.internet.ref).top().to(this.route53.ref).left().points(3).color("#FFAC1C").tags([Tags.EndUser]).draw(view) });
            // }

            // if (this.waf != undefined) {
            //     this.addArrow({ internet_arrow_to_waf: new Arrow(this.internet.ref).right().to(this.waf.ref).left().points(3).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.route53 != undefined) {
            this.route53.drawLines(view, this);

            if (this.route53DNSFirewall != undefined) {
                this.addArrow({ route53_arrow_to_route53DNSFirewall: new Arrow(this.route53.ref).top().to(this.route53DNSFirewall.ref).bottom().color("#FFAC1C").tags([Tags.EndUser]).draw(view) });
            }
        }

        if (this.route53DNSFirewall != undefined) {
            this.route53DNSFirewall.drawLines(view, this);

            if (this.route53DNSResolver != undefined) {
                this.addArrow({ route53DNSFirewall_arrow_to_route53DNSResolver: new Arrow(this.route53DNSFirewall.ref).top().to(this.route53DNSResolver.ref).bottom().color("#FFAC1C").tags([Tags.EndUser]).draw(view) });
            }
        }

        if (this.route53DNSResolver != undefined) {
            this.route53DNSResolver.drawLines(view, this);

            if (this.route53DNSPublicHostedZone != undefined) {
                this.addArrow({ route53DNSResolver_arrow_to_route53DNSPublicHostedZone: new Arrow(this.route53DNSResolver.ref).left().to(this.route53DNSPublicHostedZone.ref).right().color("#FFAC1C").tags([Tags.EndUser]).draw(view) });
            }

            // if (this.route53DNSPrivateHostedZone != undefined) {
            //     this.addArrow({ route53DNSResolver_arrow_to_route53DNSPrivateHostedZone: new Arrow(this.route53DNSResolver.ref).top().offset(-40).to(this.route53DNSPrivateHostedZone.ref).top().color("#FFAC1C").points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.waf != undefined) {
            this.waf.drawLines(view, this);

            if (this.cloudfront != undefined) {
                this.addArrow({ waf_arrow_to_cloudfront: new Arrow(this.waf.ref).right().to(this.cloudfront.ref).left().tags([Tags.EndUser]).draw(view) });
            }
            // if (this.certificateManager != undefined) {
            //     this.addArrow({ waf_arrow_to_certificateManager: new Arrow(this.waf.ref).bottom().to(this.certificateManager.ref).top().points(3).color("#FE7F9C").tags([Tags.Management]).draw(view) });
            // }
        }


        if (this.cloudfront != undefined) {
            this.cloudfront.drawLines(view, this);

            if (this.internetGateway != undefined) {
                this.addArrow({ cloudfront_arrow_to_internetGateway: new Arrow(this.cloudfront.ref).right().to(this.internetGateway.ref).left().tags([Tags.EndUser]).draw(view) });
            }

            if (this.s3 != undefined) {
                this.addArrow({ cloudfront_arrow_to_s3: new Arrow(this.cloudfront.ref).bottom().to(this.s3.ref).top().tags([Tags.EndUser]).draw(view) });
            }
            // if (this.certificateManager != undefined) {
            //     this.addArrow({ cloudfront_arrow_to_certificateManager: new Arrow(this.cloudfront.ref).bottom().to(this.certificateManager.ref).top().points(3).color("#FE7F9C").tags([Tags.Management]).draw(view) });
            // }
        }

        if (this.internetGateway != undefined) {
            this.internetGateway.drawLines(view, this);

            // if (this.internetGateway != undefined) {
            //     this.addArrow({ internetGateway_arrow_to_firewallEndpoint_az1: new Arrow(this.internetGateway.ref).right().to(this.firewallEndpointSubnet.az1.ref).left().points(3).tags([Tags.EndUser]).draw(view) });
            //     this.addArrow({ internetGateway_arrow_to_firewallEndpoint_az2: new Arrow(this.internetGateway.ref).right().to(this.firewallEndpointSubnet.az2.ref).left().points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.firewallEndpointSubnet != undefined) {
            this.firewallEndpointSubnet.drawLines(view, this);

            // if (this.applicationLoadBalancer != undefined) {
            //     this.addArrow({ firewallEndpoint_az1_arrow_to_applicationLoadBalancer: new Arrow(this.firewallEndpointSubnet.az1.ref).right().to(this.applicationLoadBalancer.ref).left().points(3).tags([Tags.EndUser]).draw(view) });
            //     this.addArrow({ firewallEndpoint_az2_arrow_to_applicationLoadBalancer: new Arrow(this.firewallEndpointSubnet.az2.ref).right().to(this.applicationLoadBalancer.ref).left().points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.applicationLoadBalancer != undefined) {
            this.applicationLoadBalancer.drawLines(view, this);

            // if (this.ec2WebSubnet != undefined) {
            //     this.addArrow({ applicationLoadBalancer_arrow_to_ec2Web_az1: new Arrow(this.applicationLoadBalancer.ref).right().to(this.ec2WebSubnet.az1.ref).bottom().points(3).tags([Tags.EndUser]).draw(view) });
            //     this.addArrow({ applicationLoadBalancer_arrow_to_ec2Web_az2: new Arrow(this.applicationLoadBalancer.ref).right().to(this.ec2WebSubnet.az2.ref).top().points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
            if (this.transitSubnet != undefined) {
                this.addArrow({ applicationLoadBalancer_arrow_to_apiGateway_az1: new Arrow(this.applicationLoadBalancer.ref).top().offset(20).to(this.transitSubnet.apiGatewayAZ1.ref).bottom().color("#338333").tags([Tags.EndUser]).draw(view) });
                this.addArrow({ applicationLoadBalancer_arrow_to_apiGateway_az2: new Arrow(this.applicationLoadBalancer.ref).bottom().offset(20).to(this.transitSubnet.apiGatewayAZ2.ref).top().color("#338333").dashed(true).tags([Tags.EndUser]).draw(view) });
            }
            // if (this.certificateManager != undefined) {
            //     this.addArrow({ applicationLoadBalancer_arrow_to_certManager: new Arrow(this.applicationLoadBalancer.ref).bottom().to(this.certificateManager.ref).top().color("#FE7F9C").points(3).tags([Tags.Management]).draw(view) });
            // }
        }

        if (this.ec2WebSubnet != undefined) {
            this.ec2WebSubnet.drawLines(view, this);

            // if (this.ec2ApplicationSubnet != undefined) {
            //     this.addArrow({ ec2Web_az1_arrow_to_ec2Application_az1: new Arrow(this.ec2WebSubnet.az1.ref).right().to(this.ec2ApplicationSubnet.az1.ref).left().points(3).tags([Tags.EndUser]).draw(view) });
            //     this.addArrow({ ec2Web_az2_arrow_to_ec2Application_az2: new Arrow(this.ec2WebSubnet.az2.ref).right().to(this.ec2ApplicationSubnet.az2.ref).left().points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.ec2ApplicationSubnet != undefined) {
            this.ec2ApplicationSubnet.drawLines(view, this);

            if (this.rdsSubnet != undefined) {
                this.addArrow({ ec2Application_az1_arrow_to_rds_az1: new Arrow(this.ec2ApplicationSubnet.az1.ref).right().to(this.rdsSubnet.az1.ref).left().tags([Tags.EndUser]).draw(view) });
                this.addArrow({ ec2Application_az2_arrow_to_rds_az2: new Arrow(this.ec2ApplicationSubnet.az2.ref).right().to(this.rdsSubnet.az2.ref).left().dashed(true).tags([Tags.EndUser]).draw(view) });
            }

            if(this.vpcEndpoint != undefined) {
                this.addArrow({ ec2Application_az1_arrow_to_vpcEndpoint: new Arrow(this.ec2ApplicationSubnet.az1.ref).bottom().to(this.vpcEndpoint.ref).top().points(3).color("#e6194B").tags([Tags.EndUser]).draw(view) });
                this.addArrow({ ec2Application_az2_arrow_to_vpcEndpoint: new Arrow(this.ec2ApplicationSubnet.az2.ref).bottom().to(this.vpcEndpoint.ref).top().points(3).color("#e6194B").dashed(true).tags([Tags.EndUser]).draw(view) });
            }
        }

        /**
         * ec2Web_az1_arrow_to_kms
         * ec2Web_az2_arrow_to_kms
         * ec2Application_az1_arrow_to_kms
         * ec2Application_az2_arrow_to_kms
         */

        if (this.rdsSubnet != undefined) {
            this.rdsSubnet.drawLines(view, this);
        }

        if (this.transitSubnet != undefined) {
            this.transitSubnet.drawLines(view, this);

            // if (this.transitSubnet.apiGatewayAZ1 != undefined && this.lambda != undefined) {
            //     this.addArrow({ apiGateway_az1_arrow_to_lambda: new Arrow(this.transitSubnet.apiGatewayAZ1.ref).left().offset(-20).to(this.lambda.ref).right().color("#338333").points(4).lineModifiers([[0, 0], [0, 0], [-60, 0]]).tags([Tags.EndUser]).draw(view) });
            // }

            // if (this.transitSubnet.apiGatewayAZ1 != undefined && this.certificateManager != undefined) {
            //     this.addArrow({ apiGateway_az1_arrow_to_certificateManager: new Arrow(this.transitSubnet.apiGatewayAZ1.ref).left().offset(-20).to(this.certificateManager.ref).right().color("#FE7F9C").points(3).tags([Tags.Management]).draw(view) });
            // }

            // if (this.transitSubnet.apiGatewayAZ2 != undefined && this.certificateManager != undefined) {
            //     this.addArrow({ apiGateway_az2_arrow_to_certificateManager: new Arrow(this.transitSubnet.apiGatewayAZ2.ref).left().offset(-20).to(this.certificateManager.ref).right().color("#FE7F9C").points(3).dashed(true).tags([Tags.Management]).draw(view) });
            // }

            // if (this.transitSubnet.apiGatewayAZ2 != undefined && this.lambda != undefined) {
            //     this.addArrow({ apiGateway_az2_arrow_to_lambda: new Arrow(this.transitSubnet.apiGatewayAZ2.ref).left().offset(-20).to(this.lambda.ref).right().color("#338333").points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }

            // if (this.transitSubnet.apiGatewayAZ1 != undefined && this.vpcEndpoint != undefined) {
            //     this.addArrow({ apiGateway_az1_arrow_to_vpcEndpoint: new Arrow(this.transitSubnet.apiGatewayAZ1.ref).right().offset(20).to(this.vpcEndpoint.ref).top().color("#e6194B").points(3).tags([Tags.EndUser]).draw(view) });
            // }

            // if (this.transitSubnet.apiGatewayAZ2 != undefined && this.vpcEndpoint != undefined) {
            //     this.addArrow({ apiGateway_az2_arrow_to_vpcEndpoint: new Arrow(this.transitSubnet.apiGatewayAZ2.ref).right().to(this.vpcEndpoint.ref).top().color("#e6194B").points(3).dashed(true).tags([Tags.EndUser]).draw(view) });
            // }
        }

        if (this.vpcEndpoint != undefined) {
            this.vpcEndpoint.drawLines(view, this);

            if (this.lambda != undefined) {
                this.addArrow({ vpcEndpoint_arrow_to_lambda: new Arrow(this.vpcEndpoint.ref).bottom().offset(55).to(this.lambda.ref).bottom().color("#4363d8").points(3).tags([Tags.EndUser]).draw(view) });
            }

            if (this.ses != undefined) {
                this.addArrow({ vpcEndpoint_arrow_to_ses: new Arrow(this.vpcEndpoint.ref).bottom().offset(55).to(this.ses.ref).top().color("#800000").points(3).tags([Tags.EndUser]).draw(view) });
            }

            if (this.sns != undefined) {
                this.addArrow({ vpcEndpoint_arrow_to_sns: new Arrow(this.vpcEndpoint.ref).bottom().offset(55).to(this.sns.ref).top().color("#808000").points(3).tags([Tags.EndUser]).draw(view) });
            }

            if (this.kms != undefined) {
                this.addArrow({ vpcEndpoint_arrow_to_kms: new Arrow(this.vpcEndpoint.ref).bottom().offset(55).to(this.kms.ref).top().color("#808000").points(3).tags([Tags.EndUser]).draw(view) });
            }
        }

        if (this.lambda != undefined) {
            this.lambda.drawLines(view, this);

            // if (this.s3 != undefined) {
            //     this.addArrow({ lambda_arrow_to_s3: new Arrow(this.lambda.ref).top().to(this.s3.ref).bottom().color("#4363d8").points(3).tags([Tags.EndUser]).draw(view) });
            // }

            if (this.rdsSubnet != undefined) {
                this.addArrow({ lambda_arrow_to_rds_az1: new Arrow(this.lambda.ref).right().offset(20).to(this.rdsSubnet.az1.ref).top().color("#4363d8").points(3).lineModifiers([[0, 0], [0, -420]]).tags([Tags.EndUser]).draw(view) });
                this.addArrow({ lambda_arrow_to_rds_az2: new Arrow(this.lambda.ref).right().offset(20).to(this.rdsSubnet.az2.ref).bottom().color("#4363d8").points(3).lineModifiers([[0, 0], [0, 100]]).dashed(true).tags([Tags.EndUser]).draw(view) });
            }

            if (this.vpcEndpoint != undefined) {
                this.addArrow({ lambda_arrow_to_vpcEndpoint: new Arrow(this.lambda.ref).right().to(this.vpcEndpoint.ref).left().color("#e6194B").points(3).tags([Tags.EndUser]).draw(view) });
            }
        }

        // // Finally make sure we have everything from the interface covered

        // console.log(Object.getOwnPropertyNames(this))
        // console.log(keyof LineNames)
    }

    public highlight(ref: Reference<any>): ThreadGenerator {

        const large = 1.5;
        const small = 1;

        if(ref == undefined) {
            return chain()
        }

        return chain(
            // Move the circle
            this.highlightCircle().absolutePosition(ref().absolutePosition(), 0),

            // Show the circle
            this.highlightCircle().opacity(1, this.lineDrawDurration / 4),

            // Pulse the circle
            this.highlightCircle().scale(small, 0)
                .to(large, this.lineDrawDurration / 2)
                .to(small, this.lineDrawDurration / 2)
                .to(large, this.lineDrawDurration / 2)
                .to(small, this.lineDrawDurration / 2),

            // Fade Out
            this.highlightCircle().opacity(1, 0).to(0, this.lineDrawDurration / 4),
        );
    }

    public getRefsExcludingTags(tags: Tags[]): Reference<Shape>[] {
        let refs: Reference<Shape>[] = [];

        let excludes_tag = function(e: Tags[], t: Tags[]): boolean {
            if(e == undefined) {e = [];}
            if(t == undefined) {t = [];}

            for(let i = 0; i < e.length; i++) {
                for(let j = 0; j < t.length; j++) {
                    if(e[i] == t[j]) {
                        return false;
                    }
                }
            }

            return true;
        }

        this.linesReferences.forEach(line => {
            //console.log("Line Tag: '"+line().tags+"' '"+tags+"'")
            if(excludes_tag(line().tags, tags)) {
                //console.log("Excludes Line Tag: '"+line().tags+"' '"+tags+"'")
                refs.push(line)
            }
        })

        this.componentReferences.forEach(comp => {
            //console.log("Component Tag: '"+comp().tags+"' '"+tags+"'")
            if(excludes_tag(comp().tags, tags)) {
                //console.log("Excludes Component Tag: '"+comp().tags+"' '"+tags+"'")
                refs.push(comp)
            }
        })

        return refs;
    }

    public getRefsByTags(tags: Tags[]): Reference<Shape>[] {
        let refs: Reference<Shape>[] = [];

        let include_tag = function(e: Tags[], t: Tags[]): boolean {
            if(e == undefined) {e = [];}
            if(t == undefined) {t = [];}

            for(let i = 0; i < e.length; i++) {
                for(let j = 0; j < t.length; j++) {
                    if(e[i] == t[j]) {
                        return true
                    }
                }
            }

            return false
        }

        this.linesReferences.forEach(line => {
            if(include_tag(line().tags, tags)) {
                refs.push(line)
            }
        })

        this.componentReferences.forEach(comp => {
            if(include_tag(comp().tags, tags)) {
                refs.push(comp)
            }
        })

        return refs;
    }

    public addArrow(property: ArrowObjectProperty): void {
        Object.assign(this, property)
        Object.keys(property).forEach(e => {
            this.linesReferences.push(property[e])
        })
        
    }

    public endUserHTTPSRewindAnimation(): ThreadGenerator {
        return endUserHTTPSFlowRewind(AWSLandscapeProxy(this));
    }

    public endUserHTTPSLowLightAnimation(): ThreadGenerator {
        return endUserHTTPSLowLight(AWSLandscapeProxy(this));

        //return endUserHTTPSLowLight(this);
    }

    public endUserHTTPSFlowAnimation(): ThreadGenerator {
        return endUserHTTPSFlow(AWSLandscapeProxy(this));
        //return endUserHTTPSFlow(this);
    }

    // protected setupContainerLabels() {
    //     const worldHeading = createRef<Heading>()
    //     this.add(<Heading ref={worldHeading} fontSize={16} padding={8} />)
    //     worldHeading().label().text("World")
    //     worldHeading().alignTo(this.world())

    //     const awsAccountHeading = createRef<Heading>()
    //     this.add(<Heading ref={awsAccountHeading} fontSize={16} padding={8} />)
    //     awsAccountHeading().label().text("AWS")
    //     awsAccountHeading().alignTo(this.awsAccount())


    //     const vpcHeading = createRef<Heading>()
    //     this.add(<Heading ref={vpcHeading} fontSize={16} padding={8} />)
    //     vpcHeading().label().text("VPC")
    //     vpcHeading().alignTo(this.availabilityZoneContainer())

    //     const az1Heading = createRef<Heading>()
    //     this.add(<Heading ref={az1Heading} fontSize={16} padding={8} />)
    //     az1Heading().label().text("AZ1")
    //     az1Heading().alignTo(this.availabilityZone1())

    //     const az2Heading = createRef<Heading>()
    //     this.add(<Heading ref={az2Heading} fontSize={16} padding={8} />)
    //     az2Heading().label().text("AZ2")
    //     az2Heading().alignTo(this.availabilityZone2())
    // }
}

export type TAWSLandscape = AWSLandscape & Partial<LineNames>;
export type ArrowObjectProperty = {[key:string]:Reference<ArrowComponent>}