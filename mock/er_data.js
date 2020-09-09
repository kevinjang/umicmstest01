export default {
    'GET /api/erdata': () => {
        return [{
            key: '0',
            RowNum: '1',
            ExpenseTime: moment(new Date(), dateFormat),
            ExpenseAddress: '北京',
            CabinType: '2',
            ExpenseTraffic: 123,
            ExpenseBoat: 0,
            ExpenseBaggage: 0,
            ExpenseHotel: 0,
            ExpenseHotelTaxCode: '_',
            ExpenseMeal: 0,
            ExpenseOther: 0,
            ExpenseSum: 123,
            InvoiceNo: '123123123'
        },
        {
            key: '1',
            RowNum: '2',
            ExpenseTime: moment(new Date(), dateFormat),
            ExpenseAddress: '上海',
            CabinType: '0',
            ExpenseTraffic: 0,
            ExpenseBoat: 0,
            ExpenseBaggage: 0,
            ExpenseHotel: 0,
            ExpenseHotelTaxCode: '_',
            ExpenseMeal: 0,
            ExpenseOther: 0,
            ExpenseSum: 0,
            InvoiceNo: ''
        }]
    }
}