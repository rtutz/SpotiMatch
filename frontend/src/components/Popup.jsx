export default function Popup({score, setShowCompatability, scrollToBottom}) {
    
    return (
        <div className="absolute bg-black bg-opacity-50 left-0 top-0 w-full h-screen z-20">
            <div className="flex justify-center items-center h-full">
            <div className="relative">

                
                <div className='flex flex-col items-center space-y-2'>
                    <h3 className="text-4xl font-bold tracking-wider">Your taste is </h3>
                    <h1 className="text-7xl font-black text-spotify-green">{Math.round(parseFloat(score) * 100) / 100}%</h1>
                    <h3 className="text-5xl font-bold tracking-wider" style={{ marginBottom: '1rem' }}>compatible</h3>
                    <div onClick={() => {
                        setShowCompatability(false);
                        scrollToBottom()
                    }}className="btn">
                        Close
                    </div>
                </div>
            </div>

            </div>
        </div>
    )
}   