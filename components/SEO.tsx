import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import _ from "lodash";

type SeoProps = {
    title: string;
    description: string;
    canonical?: string;
    css?: string;
    js?: string;
    image?: string;
    video?: string;
};

const defaultTitle = "Loading..";
const defaultDescription = "Loading..";

export const SEO: React.FC<SeoProps> = ({ title, description, canonical, css, js, image, video }) => {
    let media: any = {
        images: [{ url: _.defaultTo(image, "https://i.ibb.co/hZzjmYB/munkey.jpg") }],
    };

    return (
        <NextSeo
            title={_.defaultTo(title, defaultTitle)}
            description={_.defaultTo(description, defaultDescription)}
            openGraph={{
                title: _.defaultTo(title, defaultTitle),
                description: _.defaultTo(description, defaultDescription),
                site_name: "Munkey",
                ...media,
            }}
        />
    );
};
