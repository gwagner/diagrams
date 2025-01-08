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

    yield* waitFor(2);
});