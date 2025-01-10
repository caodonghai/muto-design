# Layout

> 布局组件

## 基本用法

<code src="./demo/base.tsx">示例1</code>

## 代码示例
```html

<Layout direction="column">
    <div>顶部区域</div>
    <Layout.Flex direction="row">
        <Layout.Slider size={180} bordered>侧边栏</Layout.Slider>
        <Layout.Flex>内容区</Layout.Flex>
    </Layout.Flex>
</Layout>

```

## API

### Layout props

<API id="Layout"></API>

### Layout.Flex props

<API id="Layout.Flex"></API>

### Layout.Slider props

<API id="Layout.Slider"></API>