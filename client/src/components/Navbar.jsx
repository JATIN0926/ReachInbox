import  Toggleswitch  from '../components/ToggleSwitch'

const Navbar = () => {
  return (
    <div className='w-[93%] bg-[#343A40] fixed right-0 text-white p-6'>
        <div className="w-full flex items-center justify-between">
            <h2 className=' font-OpenSans-Bold text-xl'>Onebox</h2>
            <div className="flex items-center justify-center gap-3">
                <Toggleswitch />
                <h1 className=' font-OpenSans-SemiBold text-xl'>Tim’s Workspace</h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar