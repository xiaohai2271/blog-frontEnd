export class Color {
    bgColor: string;
    fontColor: string
}

export const ColorList: Color[] = [
    {bgColor: '#7bcfa6', fontColor: '#000000'}, // 石青
    {bgColor: '#bce672', fontColor: '#000000'}, // 松花色
    {bgColor: '#ff8936', fontColor: '#000000'}, // 橘黄
    {bgColor: '#f0c239', fontColor: '#000000'}, // 缃色
    {bgColor: '#808080', fontColor: '#ffffff'}, // 灰色
    {bgColor: '#3eede7', fontColor: '#000000'}, // 碧蓝
    {bgColor: '#177cb0', fontColor: '#ffffff'}, // 靛青
];

export const ColorListLength = ColorList.length

/**
 * 获取一组随机颜色
 * @param count 数量
 */
export function RandomColor(count: number = 1): Color[] {
    const map = new Map<number, number>();
    ColorList.forEach((color, index) => map.set(index, 0))
    const colorArray: Color[] = [];
    const oneRandomColor = () => {
        const minValue = Math.min.apply(null, Array.from(map.values()))
        const keys = Array.from(map.keys()).filter(key => map.get(key) === minValue);
        const keyIndex = Math.floor(Math.random() * keys.length);
        const index = keys[keyIndex];
        map.set(index, minValue + 1);
        return ColorList[index]
    };
    for (let i = 0; i < count; i++) {
        colorArray.push(oneRandomColor());
    }
    return colorArray;
}
