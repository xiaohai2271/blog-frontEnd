class DataProperties {
    static windowsMode: 'small' | 'middle' | 'large' = null;
}

export function windowWidthChange(func) {
    DataProperties.windowsMode = window.innerWidth < 910 ? 'small' : (window.innerWidth > 1300 ? 'large' : 'middle');
    // 监听宽度变化
    window.addEventListener('resize', () => {
        DataProperties.windowsMode = window.innerWidth < 910 ? 'small' : (window.innerWidth > 1300 ? 'large' : 'middle');
        func();
    });
}

export function windowsMode() {
    return DataProperties.windowsMode;
}

