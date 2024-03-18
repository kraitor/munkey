// eslint-disable-next-line import/prefer-default-export
export const formatDecimalZeros = (value: any, numberOfZeros?: any) => {
    if(!value)
        return value;

    const integer: any = value.split('.')[0];
    const decimals: any = value.split('.')[1];
    let decimalsPad = '';
    let indexNotZeros = 0;

    for (let i = 0; i < decimals.length; i++) {
        if (decimals.charAt(i) !== '0') {
            indexNotZeros++;
        }

        decimalsPad += decimals.charAt(i);

        if (indexNotZeros === numberOfZeros)
            break;
    }

    // eslint-disable-next-line prefer-template
    return integer + '.' + decimalsPad;
}

export const numberWithCommas = (x: any) => {
    if(!x) return x;

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const padLeadingZeros = (num: any, size: any) => {
    let s: any = `${num}`;
    while (s.length < size) s = `0${s}`;
    return s;
}