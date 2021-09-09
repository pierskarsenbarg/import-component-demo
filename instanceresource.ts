import * as pulumi from "@pulumi/pulumi";
import { CustomResource } from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export class instanceresource extends pulumi.ComponentResource {
    public instanceId: pulumi.Output<string>;
    constructor(name: string, opts?: CustomResource) {
        super("x:index:instanceresource", name, opts);

        const instance = new aws.ec2.Instance("myinstance", {
            ami: "ami-05afacb6ea1b9c088",
            instanceType: "t2.micro",
            tags: {
                "Name": "test"
            }
        }, { import: "i-12345678", parent: this });

        this.instanceId = instance.id;
        this.registerOutputs({
            instanceId: this.instanceId
        });
    }
}