const BASE_URL = "https://website.com"
const DESCRIPTION = 'Description for website'
const IMAGE = BASE_URL + '/share.jpg'
const BASE_TITLE_TEMPLATE = 'WEBSITE NAME'

export const useSeo = (
    { title = '', description = '', image = null } = {}, // ? seo
    pageTitle = '',
    slug = undefined
) => {

    const route = useRoute()
    const finalSlug = slug || route.fullPath

    // METE
    const descriptions = [
        { name: 'description', hid: 'description', content: description || DESCRIPTION },
        { property: 'og:description', hid: 'og_description', content: description || DESCRIPTION },
        { property: 'og:image:alt', hid: 'og_image_alt', content: description || DESCRIPTION },
        { name: 'twitter:description', hid: 'twitter_description', content: description || DESCRIPTION },
        { name: 'twitter:image:alt', hid: 'twitter_image_alt', content: description || DESCRIPTION },
    ]

    // IMAGES
    const images = [
        { property: 'og:image', hid: 'og_image', content: image || IMAGE },
        { property: 'og:image:secure_url', hid: 'og_image_secure', content: image || IMAGE },
        { name: 'twitter:image:src', hid: 'twitter_image', content: image || IMAGE },
        { name: 'twitter:image', content: image || IMAGE },
    ]

    // TITLES
    const titles = [
        { name: 'keywords', content: `${BASE_TITLE_TEMPLATE} ${title || pageTitle}` },
        { property: 'og:title', hid: 'og_title', content: `${BASE_TITLE_TEMPLATE} ${title || pageTitle}` },
        { name: 'twitter:title', hid: 'twitter_title', content: `${BASE_TITLE_TEMPLATE} ${title || pageTitle}` },
    ]

    // HEAD
    useHead({
        title: `${BASE_TITLE_TEMPLATE} ${title || pageTitle}`,
        meta: [
            ...(title || pageTitle ? titles : []),
            ...(description || DESCRIPTION ? descriptions : []),
            ...(image || IMAGE ? images : []),
        ],
        link: [
            { rel: 'canonical', href: `${BASE_URL}${finalSlug}` },
        ],
    })
}
