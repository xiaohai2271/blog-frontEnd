export class Link {
    id?: number;
    name: string;
    url: string;
    open?: boolean;
    iconPath: string;
    desc: string;
}


export class ApplyLinkReq {
    desc: string;
    email: string;
    iconPath: string;
    linkUrl: string;
    name: string;
    url: string
}
