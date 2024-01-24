import { useState } from "react";
import Search from "./Search";
import TransactionTable from "./TransactionTable";
import User from "./User";

const Transaction = () => {
    const [transactions, setTransactions] = useState([
        {
            "_id": "65ac8dd47a483580b76b8381",
            "transactionID": "TRANS-2024-0021",
            "productID": "PRD-0001",
            "transactionType": "CREATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T03:21:56.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65aca7a57a483580b76b839f",
            "transactionID": "TRANS-2024-0022",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T05:12:05.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acaff47a483580b76b83c2",
            "transactionID": "TRANS-2024-0023",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T05:47:32.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb4353d0331c3201fd9f2",
            "transactionID": "TRANS-2024-0024",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:05:41.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb46a3d0331c3201fd9fa",
            "transactionID": "TRANS-2024-0025",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:06:34.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb8453d0331c3201fda00",
            "transactionID": "TRANS-2024-0026",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:23:01.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb8613d0331c3201fda06",
            "transactionID": "TRANS-2024-0027",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:23:29.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb8d73d0331c3201fda0e",
            "transactionID": "TRANS-2024-0028",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:25:27.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb9293d0331c3201fda14",
            "transactionID": "TRANS-2024-0029",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:26:49.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acb9743d0331c3201fda1a",
            "transactionID": "TRANS-2024-0030",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:28:04.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acba3d3d0331c3201fda20",
            "transactionID": "TRANS-2024-0031",
            "productID": "PRD-0001",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:31:25.000Z",
            "productName": "Dabur Red Paste",
            "quantityInStock": 0
        },
        {
            "_id": "65acba573d0331c3201fda27",
            "transactionID": "TRANS-2024-0032",
            "productID": "PRD-0002",
            "transactionType": "CREATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:31:51.000Z",
            "productName": "Zenfone 10",
            "quantityInStock": 0
        },
        {
            "_id": "65acba6a3d0331c3201fda2d",
            "transactionID": "TRANS-2024-0033",
            "productID": "PRD-0002",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:32:10.000Z",
            "productName": "Zenfone 10",
            "quantityInStock": 0
        },
        {
            "_id": "65acbad03d0331c3201fda33",
            "transactionID": "TRANS-2024-0034",
            "productID": "PRD-0002",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:33:52.000Z",
            "productName": "Zenfone 10",
            "quantityInStock": 0
        },
        {
            "_id": "65acbae13d0331c3201fda39",
            "transactionID": "TRANS-2024-0035",
            "productID": "PRD-0002",
            "transactionType": "UPDATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T06:34:09.000Z",
            "productName": "Zenfone 10",
            "quantityInStock": 0
        },
        {
            "_id": "65ad313c52ab805a9ddd778a",
            "transactionID": "TRANS-2024-0036",
            "productID": "PRD-0003",
            "transactionType": "CREATED",
            "quantity": 0,
            "transactionDate": "2024-01-21T14:59:08.000Z",
            "productName": "Mysore sandal",
            "quantityInStock": 0
        }
    ]);

    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Transaction
                </h1>
                <div className="flex">
                    <Search
                        
                    />
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <section className="w-full p-5">
                <article className="flex flex-col gap-2 py-2">
                    <h2 className="text-xl font-bold">
                        Filters
                    </h2>
                    <article className="flex gap-12 my-2">
                        <div className="w-20 h-8 bg-white flex justify-center items-center rounded-lg">
                            <span className="text-black">Date</span>
                        </div>
                        <div className="w-32 h-8 bg-white flex justify-center items-center rounded-lg">
                            <span className="text-black">Product Name</span>
                        </div>
                    </article>
                </article>
                <article className="flex flex-col gap-2 py-2 my-2 border-t-2 border-b-2 border-raisinblack">
                    <p className="py-6">
                        Showing 8 of 12 results
                    </p>
                </article>
                <article className="flex">
                    <div className="w-3/5 max-h-[590px] overflow-y-auto">
                        <TransactionTable 
                            transactions={transactions}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">
                            Transaction Details
                        </h2>
                    </div>
                </article>
            </section>
        </section>
    );
}

export default Transaction;