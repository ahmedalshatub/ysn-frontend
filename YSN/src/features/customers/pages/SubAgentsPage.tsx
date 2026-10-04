import CustomerTypePage from "../components/CustomerTypePage";
import { CustomerRole } from "../types/Customers.types";

const SubAgentsPage = () => <CustomerTypePage customerType={CustomerRole.SubAgent} />;

export default SubAgentsPage;
