import * as contentful from "contentful";
import _ from "lodash";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

type Options = {
    space: string,
    host: string | undefined,
    accessToken: string,
    environment: string,
    resolveLinks: boolean
}

const getOptions = (is_preview: boolean) => {
    let options: Options = {
        space: "",
        host: is_preview ? "preview.contentful.com" : undefined,
        accessToken: "",
        environment: environment ? environment : "master",
        resolveLinks: true
    };
    if (space_id){
        options.space += space_id;
    }
    if (is_preview && preview_token){
        options.accessToken += preview_token;
    }
    if (!is_preview && access_token){
        options.accessToken += access_token;
    }
    return options;
};

export const getAllLocales = async() => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);
    try {
        let allLocales = await contentfulClient.getLocales();
        let dataType = _.get(allLocales, "sys.type");
        let items = _.get(allLocales, "items");
        if (dataType === "Array") {
            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.log("getAllLocales error ", error);
    }
};

export const getEntriesByContentType = async(content_type: string, slug: string | null = null) => {
    const options = getOptions(false);

    try {
        const contentfulClient = contentful.createClient(options);
        if (contentfulClient) {
            let params;
            if (slug) {
                params = { 
                    content_type: content_type, 
                    include: 10, 
                    fields: { 
                        slug: slug 
                    } 
                };
            }
            else {
                params = { 
                    content_type: content_type, 
                    include: 3 
                };
            }
            let entries = await contentfulClient.getEntries(params); 
            const items = _.get(entries, "items");

            return { items };
        } else {
            return false;
        }
    } catch (error) {
        console.log("any errors? ->", error);
        return false;
    }
};