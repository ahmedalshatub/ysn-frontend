import CustomerTypePage from "../components/CustomerTypePage";
import { CustomerType } from "../types/Customers.types";

const AgentsPage = () => <CustomerTypePage customerType={CustomerType.Agent} />;

export default AgentsPage;
