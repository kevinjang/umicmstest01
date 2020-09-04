import { dynamic } from 'umi'

export default dynamic({
    loader: async function (name) {
        const HugeA = await import(`@ant-design/icons/${name}Outlined`);

        return HugeA;
    }
})