import CustomerTypePage from "../components/CustomerTypePage";
import { CustomerRole } from "../types/Customers.types";

const AgentsPage = () => <CustomerTypePage customerType={CustomerRole.Agent} />;

export default AgentsPage;
