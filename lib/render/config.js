let applicationRender = null;

export function configureUpdateUI(render) {
    applicationRender = render;
}

export function updateUI() {
    if (applicationRender === null) {
        throw new ReferenceError('There is no updateUI render function configured.');
    }

    applicationRender();
}
