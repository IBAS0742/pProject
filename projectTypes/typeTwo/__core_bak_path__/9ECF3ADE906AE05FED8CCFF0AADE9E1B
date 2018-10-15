export const sizes = {
    desktop: {
        size: {
            'A': '1024x600',    //10-12英寸
            'B': '1280x800',    //13英寸1
            'C': '1600x900',    //14英寸
            // 'D': '1600x900',    //15英寸
        },
        defaultSize: "1024x600",
    },
    mobile: {
        size: {
            'iPhon4': '320x480',
            'iPhon5/SE': '320x568',
            'iPhon6/7/8': '375x667',
            'iPhon6/7/8PLUS': '414x736',
            'iPhonX': '375x812',
            'iPad': '768x1024',
            'iPad Pro': '1024x1366',
            'Galaxy Note 3': '360x640',
            'Nexus 10': '800x1280',
            'Pixel 2': '411x731',
        },
        defaultSize: "320x480",
    }
};

export const getSize = (theme) => {
    return sizes[theme]
};

/**
 *
 * @param size [width,height]
 * @param container [dom]
 */
export const justify = (size,container) => {
    let scale = 1;
    let height = container.clientHeight;
    let width = container.clientWidth;
    size[0] = parseInt(size[0]);
    size[1] = parseInt(size[1]);
    if (height < size[1] + 80) {
        if (width < size[0] + 80) {
            let scale1 = height / (size[1] + 80),
                scale2 = width / (size[0] + 80);
            scale = scale1 < scale2 ? scale1 : scale2;
        } else {
            scale = height / (size[1] + 80);
        }
    } else if (width < size[0] + 80) {
        scale = width / (size[0] + 80);
    }
    return {
        scale,
        width: size[0] * scale,
        height: size[1].scale
    };
};
