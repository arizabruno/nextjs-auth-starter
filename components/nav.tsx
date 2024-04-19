import Navbar from '../app/navbar';
import { getSession } from '../app/actions';

export default async function Nav() {
  const session = await getSession();
  return <Navbar user={session?.user} />;
}
