import InboundForm from "./InboundForm";
import User from "./User";

const Inbound = () => {
    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Inbound
                </h1>
                <div className="flex">
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <InboundForm />
        </section>
    );
}

export default Inbound;