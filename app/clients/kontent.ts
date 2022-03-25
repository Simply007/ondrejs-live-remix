import { camelCasePropertyNameResolver, createDeliveryClient } from "@kentico/kontent-delivery";

const client = createDeliveryClient({
    projectId: "e2ff5f6c-943c-010c-4363-3b7e71d0c309",
    propertyNameResolver: camelCasePropertyNameResolver
});

export {
    client
}