import React from 'react';

const Footer = (props) => {
    return null;

    return (
        <section id="footer" className="footer">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="networks">
                        <a href="https://t.me/BabyApeFunClub" target="_blank">
                            <IconSvgTelegram
                                width={30}
                                height={30}
                                style={{ width: 30, height: 30, maxWidth: 30, maxHeight: 30 }}
                            />
                        </a>
                        <a href="https://babyapefunclub.com" target="_blank">
                            <IconSvgWebsite
                                width={30}
                                height={30}
                                style={{ width: 30, height: 30, maxWidth: 30, maxHeight: 30 }}
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="copyright">
                        <h6>Copyright © 2022 - Powered by <a href="https://kraitor.dev/" target="_blank">Kraitor Team</a></h6>
                    </div>
                </div>
            </div>

            <div className='footer-blur'></div>
        </section>
    )
}

const IconSvgWebsite = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="30"
        height="30"
        data-name="Layer 3"
        viewBox="0 0 32 32"
    >
        <linearGradient
            id="linear-gradient"
            x1="-1.545"
            x2="21.168"
            y1="24.989"
            y2="3.101"
            gradientUnits="userSpaceOnUse"
        >
            <stop offset="0" stopColor="#00a1e2"></stop>
            <stop offset="1" stopColor="#00e0a5"></stop>
        </linearGradient>
        <linearGradient
            id="linear-gradient-2"
            x1="2.411"
            x2="25.125"
            y1="29.094"
            y2="7.207"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-3"
            x1="6.368"
            x2="29.081"
            y1="33.2"
            y2="11.313"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-4"
            x1="1.356"
            x2="24.069"
            y1="27.999"
            y2="6.112"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-5"
            x1="7.757"
            x2="30.471"
            y1="34.642"
            y2="12.754"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-6"
            x1="10.898"
            x2="33.611"
            y1="37.901"
            y2="16.014"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-7"
            x1="3.467"
            x2="26.18"
            y1="30.19"
            y2="8.302"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-8"
            x1="-6.075"
            x2="16.639"
            y1="20.288"
            y2="-1.6"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <linearGradient
            id="linear-gradient-9"
            x1="-2.934"
            x2="19.779"
            y1="23.547"
            y2="1.66"
            xlinkHref="#linear-gradient"
        ></linearGradient>
        <path
            fill="url(#linear-gradient)"
            d="M21.386 10C20.331 5.1 18.081 2 16 2s-4.331 3.1-5.386 8z"
        ></path>
        <path
            fill="url(#linear-gradient-2)"
            d="M10 16a30.013 30.013 0 00.267 4h11.466A30.013 30.013 0 0022 16a30.013 30.013 0 00-.267-4H10.267A30.013 30.013 0 0010 16z"
        ></path>
        <path
            fill="url(#linear-gradient-3)"
            d="M10.614 22c1.055 4.9 3.305 8 5.386 8s4.331-3.1 5.386-8z"
        ></path>
        <path
            fill="url(#linear-gradient-4)"
            d="M23.434 10h6.3a15.058 15.058 0 00-10.449-8.626C21.182 3.043 22.67 6.129 23.434 10z"
        ></path>
        <path
            fill="url(#linear-gradient-5)"
            d="M30.453 12h-6.7A32.332 32.332 0 0124 16a32.332 32.332 0 01-.248 4h6.7a14.9 14.9 0 000-8z"
        ></path>
        <path
            fill="url(#linear-gradient-6)"
            d="M19.285 30.626A15.058 15.058 0 0029.736 22h-6.3c-.766 3.871-2.254 6.957-4.151 8.626z"
        ></path>
        <path
            fill="url(#linear-gradient-7)"
            d="M8.566 22h-6.3a15.058 15.058 0 0010.451 8.626C10.818 28.957 9.33 25.871 8.566 22z"
        ></path>
        <path
            fill="url(#linear-gradient-8)"
            d="M12.715 1.374A15.058 15.058 0 002.264 10h6.3c.766-3.871 2.254-6.957 4.151-8.626z"
        ></path>
        <path
            fill="url(#linear-gradient-9)"
            d="M8 16a32.332 32.332 0 01.248-4h-6.7a14.9 14.9 0 000 8h6.7A32.332 32.332 0 018 16z"
        ></path>
    </svg>
)

const IconSvgTelegram = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
        <path
            style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "#000",
                fillOpacity: 1,
            }}
            d="M24.61 28.242H5.39c-1.98 0-3.632-1.652-3.632-3.633v-2.578h.703v2.578c0 1.598 1.332 2.93 2.93 2.93h19.218c1.598 0 2.93-1.332 2.93-2.93V5.391c0-1.598-1.332-2.93-2.93-2.93h-3.047v-.703h3.047c1.98 0 3.633 1.652 3.633 3.633v19.218c0 1.98-1.652 3.633-3.633 3.633Zm-22.15-6.68h-.702v-.703h.703Zm0-1.171h-.702v-15c0-1.98 1.652-3.633 3.633-3.633h15.703v.703H5.39c-1.598 0-2.93 1.332-2.93 2.93Zm0 0"
        />
        <path
            style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "#000",
                fillOpacity: 1,
            }}
            d="M20.117 22.625c-.203 0-.426-.086-.66-.258-1.102-.797-2.203-1.597-3.305-2.398l-.238-.172c-.36-.266-.387-.262-.75.035-.656.54-1.238 1.02-1.789 1.461-.125.098-.504.406-.906.281-.403-.12-.547-.582-.594-.734-.11-.36-.223-.715-.332-1.07a358.542 358.542 0 0 1-1-3.235c-.035-.129-.074-.156-.18-.195-.812-.293-1.636-.602-2.433-.895l-.856-.316c-.21-.078-.523-.195-.738-.492a.367.367 0 0 1-.063-.203c0-.508.2-.805.668-.985 5.524-2.125 10.508-4.039 15.536-5.98.668-.262 1.023.066 1.207.386.03.051.046.114.046.172 0 .192-2.804 13.649-2.832 13.786-.085.406-.265.664-.53.769a.782.782 0 0 1-.25.043Zm-4.57-3.727c.238 0 .48.11.781.329l.238.171 3.305 2.403c.145.105.219.12.242.12.012-.015.059-.077.094-.253.867-4.145 2.578-12.426 2.797-13.559-.047-.046-.113-.05-.277.012-5.028 1.945-10.008 3.86-15.532 5.984-.152.06-.199.09-.215.2.102.07.215.125.336.164l.856.316 2.43.895a.934.934 0 0 1 .617.652c.324 1.078.664 2.172.996 3.227.11.359.219.714.332 1.07.058.183.11.25.125.27.027-.004.11-.032.262-.157a146.12 146.12 0 0 0 1.78-1.453c.321-.262.575-.39.833-.39Zm-2.836.676h-.008c-.418-.008-.52-.37-.558-.508-.094-.328-.192-.656-.286-.988-.168-.57-.34-1.16-.5-1.742-.101-.379-.09-.91.547-1.305 2.149-1.328 7.457-4.594 7.524-4.629a.326.326 0 0 1 .133-.039c.277-.027.445.121.515.27a.538.538 0 0 1-.148.601c-.332.313-4.387 4.086-6.075 5.645-.261.242-.39.5-.414.832-.03.383-.09.762-.148 1.129l-.023.172c-.067.46-.34.562-.56.562Zm5.191-7.41c-1.683 1.035-4.117 2.531-5.625 3.465-.273.168-.297.312-.238.52.156.578.328 1.167.492 1.734l.13.445c.034-.226.062-.45.077-.672.035-.5.266-.965.64-1.293 1.075-.992 3.102-2.879 4.524-4.199Zm0 0"
        />
    </svg>
)

export default Footer;