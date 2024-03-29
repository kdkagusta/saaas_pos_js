import {
    Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Box
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
    LineChart,
    Line,
    CartesianGrid,
    YAxis,
    XAxis,
    Tooltip,
    Legend,
} from 'recharts';
import Card from "../../components/Common/Card"
import { useAuth } from "../../context/AppContext"
import { formatDate, formatIDR } from "../../utils";
import { getSummary } from "./Api"

export default function Dashboard(props) {
    const { user } = useAuth()

    const [saleAmount, setSaleAmount] = useState('0')
    const [purchaseAmount, setPurchaseAmount] = useState('0');
    const [sale, setSale] = useState('10')
    const [saleYesterday, setSaleYesterday] = useState('1');
    const [purchase, setPurchase] = useState('10')
    const [purchaseYesterday, setPurchaseYesterday] = useState('1')
    const [grownSale, setGrownSale] = useState('9');
    const [grownPurchase, setGrownPurchase] = useState('9');

    const [graphSale, setGraphSale] = useState([])
    const [graphPurchase, setGraphPurchase] = useState([])

    const grossProfit = +saleAmount - +purchaseAmount

    useEffect(() => {
        const { role } = user
        if (role === "kasir") {
            props.history.push("/sales/create")
        }
        getSummary(user.accessToken)
            .then(res => {
                setSaleAmount(res.data.totalSales)
                setPurchaseAmount(res.data.totalPurchases)
                setSale(res.data.saleCount)
                setSaleYesterday(res.data.saleYesterdayCount)
                setPurchase(res.data.purchaseCount)
                setPurchaseYesterday(res.data.purchaseYesterdayCount)
                setGrownSale(res.data.grownSale)
                setGrownPurchase(res.data.grownPurchase)

                setGraphSale(res.data.graphSale.map(gs => {
                    return {
                        sale: gs.count,
                        date: formatDate(new Date(gs.date))
                    }
                }))
                setGraphPurchase(
                    res.data.graphPurchase.map((gs) => {
                        return {
                            purchase: gs.count,
                            date: formatDate(new Date(gs.date)),
                        };
                    })
                );
            })
        return () => { }
    }, [user, props])

    return (
        <Flex direction="column">
            <Flex
                flexShrink="revert"
                direction="row"
                justifyContent="flex-start"
                flexWrap="wrap"
            >
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>{user.name}</StatLabel>
                        <StatNumber>hai</StatNumber>
                    </Stat>
                </Card>
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>penjualan</StatLabel>
                        <StatNumber>{sale}</StatNumber>
                        <StatHelpText>
                            <StatArrow
                                type={sale <= saleYesterday ? 'decrease' : 'increase'}
                            />
                            {formatIDR(Math.abs(grownSale) * 100)}% dibanding kemarin
                        </StatHelpText>
                    </Stat>
                </Card>
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>pembelian</StatLabel>
                        <StatNumber>{purchase}</StatNumber>
                        <StatHelpText>
                            <StatArrow
                                type={
                                    purchase <= purchaseYesterday ? 'decrease' : 'increase'
                                }
                            />
                            {formatIDR(Math.abs(grownPurchase) * 100)}% dibanding kemarin
                        </StatHelpText>
                    </Stat>
                </Card>
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>laba kotor</StatLabel>
                        <StatNumber>{formatIDR(grossProfit)}</StatNumber>
                    </Stat>
                </Card>
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>total penjualan</StatLabel>
                        <StatNumber>{formatIDR(saleAmount)}</StatNumber>
                    </Stat>
                </Card>
                <Card flex="4" mt="2">
                    <Stat>
                        <StatLabel>total pembelian</StatLabel>
                        <StatNumber>{formatIDR(purchaseAmount)}</StatNumber>
                    </Stat>
                </Card>
                <Box flex="4"></Box>
                <Box flex="4"></Box>
            </Flex>
            <Flex mt="3" direction={{ base: 'column', md: 'row' }}>
                <Card flex="1" mx="1" my="1" maxW="30rem">
                    <LineChart width={400} height={300} data={graphSale}>
                        <Line type="monotone" dataKey="sale" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="date" interval="preserveEnd" />
                        <YAxis dataKey="sale" interval="preserveEnd" />
                    </LineChart>
                </Card>
                <Card flex="1" mx="1" my="1" maxW="30rem">
                    <LineChart width={400} height={300} data={graphPurchase}>
                        <Line type="monotone" dataKey="purchase" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="date" interval="preserveEnd" />
                        <YAxis dataKey="purchase" interval="preserveEnd" />
                    </LineChart>
                </Card>
            </Flex>
        </Flex>
    );
}