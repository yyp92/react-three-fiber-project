// 主题切换
export const getDarkTheme = (theme: number) => {
    // 获取根元素
    const root = document.documentElement;

    if (theme != 1) {
        // 修改 data-theme 属性的值为 "light"
        root.setAttribute('data-theme', 'light');
        return
    }

    // 修改 data-theme 属性的值为 "dark"
    root.setAttribute('data-theme', 'dark');
}