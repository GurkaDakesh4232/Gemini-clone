import React, { useContext } from 'react';
import './Main.css'; // External styles
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);

    // Log for debugging (you can remove this in production)
    console.log("Recent Prompt:", recentPrompt);
    console.log("Result Data:", resultData);
    console.log('Loading:', loading);

    // Inline styles for spinner
    const spinnerStyle = {
        border: '8px solid #f3f3f3', // Light grey
        borderTop: '8px solid #3498db', // Blue
        borderRadius: '50%',
        width: '40px', // Spinner size
        height: '40px',
        animation: 'spin 1s linear infinite', // Spin animation
        margin: 'auto', // Center the spinner
    };

    // Function to handle input submission on Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            onSent(input); // Call the send function
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini Clone</p>
                <img src={assets.user_icon} alt='User Icon' />
            </div>

            <div className='main-container'>
                {!showResult ? (
                    <>
                        <div className='greet'>
                            <p><span>Hello, Boss</span></p>
                            <p>How Can I help You Today...</p>
                        </div>

                        <div className='cards'>
                            <div className='card' style={{border:'none'}}>
                                <p>Suggest a beautiful thing in the world</p>
                                <img src={assets.compass_icon} alt='Compass Icon' />
                            </div>
                            <div className='card' style={{border:'none'}}>
                                <p>Briefly summarize the concept of urban planning</p>
                                <img src={assets.bulb_icon} alt='Bulb Icon' />
                            </div>
                            <div className='card' style={{border:'none'}}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='Message Icon' />
                            </div>
                            <div className='card' style={{border:'none'}}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='Code Icon' />
                            </div>
                        </div>
                    </>
                ) : (
                    <div
                        className='result'
                        style={{
                            padding: '10px 5%',
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            scrollbarWidth: 'none',
                        }}
                    >
                        <div className='result-title' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img
                                src={assets.user_icon}
                                alt="User Icon"
                                style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }}
                            />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className='result-data' style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                            <img
                                className='result-data-img'
                                src={assets.gemini_icon}
                                alt='Gemini Icon'
                                style={{ width: '40px', borderRadius: '50%' }}
                            />
                            {loading ? (
                                <div style={spinnerStyle}></div> // Spinner for loading
                            ) : (
                                <p style={{ lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: resultData || "No data available" }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className='main-bottom'>
                    <div className='search-box'>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type='text'
                            placeholder='Enter prompt here...'
                            onKeyDown={handleKeyDown} // Trigger on Enter key
                        />
                        <div>
                            <img src={assets.gallery_icon} alt='Gallery Icon' />
                            <img src={assets.mic_icon} alt='Mic Icon' />
                            {input?
                            
                            <img
                            onClick={() => input.trim() && onSent(input)} // Call only if input is non-empty
                            src={assets.send_icon}
                            alt='Send Icon'
                        />:null}
                            
                        </div>
                    </div>

                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                         <br/>
                         <br/><p style={{
    fontWeight: 'bold', 
    background: 'linear-gradient(90deg, pink, blue)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
}}>
    Created By ... Dakesh4232 ...
</p>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Main;
