export const products = [
    {
        groupTitle: 'wiredHeadphones',
        items: [
            {
                img: '/assets/images/products/apple-byz.svg',
                title: 'Apple BYX S852I',
                price: 2927,
                rate: 4.7,
            },
            {
                img: '/assets/images/products/apple-earpods-1.svg',
                title: 'Apple EarPods',
                price: 2327,
                rate: 4.5,
            },
            {
                img: '/assets/images/products/apple-earpods-2.svg',
                title: 'Apple EarPods',
                price: 1745,
                rate: 3.7,
            },
        ],
    },
    {
        groupTitle: 'wirelessHeadphones',
        items: [
            {
                img: '/assets/images/products/apple-airpods.svg',
                title: 'Apple AirPods',
                price: 9527,
                rate: 4.9,
            },
            {
                img: '/assets/images/products/gerlax.svg',
                title: 'GERLAX GH-04',
                price: 6527,
                rate: 4.6,
            },
            {
                img: '/assets/images/products/borofone.svg',
                title: 'BOROFONE BO4',
                price: 7527,
                rate: 4.8,
            },
        ],
    },
];

export const fetchProducts = () => {
    let idCounter = 0;
    return products.map((productsGroup) => ({
        ...productsGroup,
        items: productsGroup.items.map((product) => ({
            ...product,
            id: idCounter++,
        })),
    }));
};
