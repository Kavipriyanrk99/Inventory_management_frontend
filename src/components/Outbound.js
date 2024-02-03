import OutboundForm from "./OutboundForm";
import User from "./User";

const Outbound = ({ products }) => {
    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Outbound
                </h1>
                <div className="flex">
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <OutboundForm
                products={products} 
            />
        </section>
    );
}

export default Outbound;