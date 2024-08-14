import {  useSelector } from 'react-redux';
import  Toggleswitch  from '../components/ToggleSwitch'

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);


  return (
    <div className='w-[95%]  fixed right-0  p-6'>
        <div className="w-full flex items-center justify-between">
            <h2 className=' font-OpenSans-Bold text-xl'>Onebox</h2>
            <div className="flex items-center justify-center gap-3">
                <Toggleswitch />
                <h1 className=' font-OpenSans-SemiBold text-xl'>{currentUser.username.split(" ")[0]}’s Workspace</h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar