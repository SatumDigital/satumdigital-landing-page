import QRCode from 'qrcode';

export async function load() {
    const qrSvg = await QRCode.toString('https://www.satumdigital.ca/card', {
        type: 'svg',
        margin: 0,
        color: { dark: '#0a0a0a', light: '#ffffff' },
        errorCorrectionLevel: 'M',
    });
    return { qrSvg };
}
