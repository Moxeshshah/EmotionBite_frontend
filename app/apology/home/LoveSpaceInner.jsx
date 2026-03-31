// 'use client'
// import { useState, useRef, useEffect } from 'react'
// import { useRouter as useNextRouter, useSearchParams as useNextSearchParams } from 'next/navigation'
// import BrandHeader from '../BrandHeader'

// export default function ApologySpace() {
//   const [message, setMessage] = useState('')
//   const [receiverName, setReceiverName] = useState('')
//   const [toastVisible, setToastVisible] = useState(false)
//   const [showSuggestions, setShowSuggestions] = useState(false)
  
//   // Audio recording states
//   const [isRecording, setIsRecording] = useState(false)
//   const [audioBlob, setAudioBlob] = useState(null)
//   const [audioPreview, setAudioPreview] = useState('')
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [duration, setDuration] = useState(0)
//   const [currentTime, setCurrentTime] = useState(0)
  
//   const router = useNextRouter()
//   const params = useNextSearchParams()
//   const code = params.get('code')
  
//   const mediaRecorderRef = useRef(null)
//   const chunksRef = useRef([])
//   const audioRef = useRef(null)

//   const suggestions = [
//     "I'm truly sorry for hurting you 💔",
//     "Please forgive me 🙏",
//     "I messed up 😔", 
//     "I never meant to cause you pain 💙",
//     "Let me make this right again 🌟"
//   ]

//   const fillText = (text) => {
//     setMessage(text)
//   }

//   const formatTime = (time) => {
//     if (!time) return '0:00'
//     const min = Math.floor(time / 60)
//     const sec = Math.floor(time % 60)
//     return `${min}:${sec.toString().padStart(2, '0')}`
//   }

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//       mediaRecorderRef.current = new MediaRecorder(stream)
      
//       mediaRecorderRef.current.ondataavailable = (e) => {
//         chunksRef.current.push(e.data)
//       }
      
//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
//         setAudioBlob(blob)
//         setAudioPreview(URL.createObjectURL(blob))
//       }
      
//       mediaRecorderRef.current.start()
//       setIsRecording(true)
//     } catch (err) {
//       alert('Microphone permission denied')
//     }
//   }

//   const stopRecording = () => {
//     if (!mediaRecorderRef.current) return
//     mediaRecorderRef.current.stop()
//     setIsRecording(false)
//   }

//   const deleteAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause()
//       audioRef.current.currentTime = 0
//     }
//     setAudioBlob(null)
//     setAudioPreview('')
//     setIsPlaying(false)
//     setCurrentTime(0)
//     setDuration(0)
//   }

//   const toggleAudio = () => {
//     const audio = audioRef.current
//     if (!audio) return
    
//     if (audio.paused) {
//       audio.play()
//       setIsPlaying(true)
//       const interval = setInterval(() => {
//         if (audio.ended) {
//           clearInterval(interval)
//           setIsPlaying(false)
//           setCurrentTime(0)
//         } else if (audio.paused) {
//           clearInterval(interval)
//         } else {
//           setCurrentTime(audio.currentTime)
//         }
//       }, 200)
//     } else {
//       audio.pause()
//       setIsPlaying(false)
//     }
//   }

//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio || !audioPreview) return

//     const handleLoaded = () => setDuration(audio.duration || 0)
//     const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
//     const handleEnded = () => {
//       setIsPlaying(false)
//       setCurrentTime(0)
//       audio.currentTime = 0
//     }

//     audio.addEventListener('loadedmetadata', handleLoaded)
//     audio.addEventListener('timeupdate', handleTimeUpdate)
//     audio.addEventListener('ended', handleEnded)
//     audio.load()

//     return () => {
//       audio.removeEventListener('loadedmetadata', handleLoaded)
//       audio.removeEventListener('timeupdate', handleTimeUpdate)
//       audio.removeEventListener('ended', handleEnded)
//     }
//   }, [audioPreview])

//   useEffect(() => {
//     if (!code) return
//     const token = localStorage.getItem('token')
//     if (!token) {
//       router.replace(`/apology/login?code=${code}`)
//     }
//   }, [code, router])

//   const uploadAudio = async () => {
//     if (!audioBlob) return
//     const formData = new FormData()
//     formData.append('file', audioBlob)
//     formData.append('upload_preset', 'audioupload')
    
//     const res = await fetch('https://api.cloudinary.com/v1_1/dgdexbbk7/video/upload', {
//       method: 'POST',
//       body: formData,
//     })
//     const data = await res.json()
//     return data.secure_url
//   }

//   const sendMessage = async () => {
//     if (!message.trim()) {
//       alert('Please write your apology message')
//       return
//     }
//     if (!receiverName.trim()) {
//       alert('Enter receiver name')
//       return
//     }

//     try {
//       const token = localStorage.getItem('token')
//       let uploadedAudioUrl = ''
//       if (audioBlob) {
//         uploadedAudioUrl = await uploadAudio()
//       }

//       const res = await fetch('/api/messages/save', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           qrCode: code,
//           receiverName,
//           receiverMobile: '1234567890',
//           senderName: localStorage.getItem('sendername'),
//           senderMobile: localStorage.getItem('sendermobile'),
//           messageText: message,
//           imageUrl: '',
//           videoUrl: '',
//           audioUrl: uploadedAudioUrl,
//         }),
//       })

//       const data = await res.json()
      
//       if (!res.ok) {
//         alert(data.message || 'Failed to send message')
//         return
//       }

//       setToastVisible(true)
//       setTimeout(() => {
//         setToastVisible(false)
//         router.push(`/apology/greet?code=${code}`)
//       }, 1500)
      
//       setMessage('')
//       setReceiverName('')
//       deleteAudio()
//     } catch (err) {
//       console.error(err)
//       alert('Server error')
//     }
//   }

//   const floatingIcons = [
//     { className: 'one', emoji: '💔', style: { top: '12%', left: '15%' } },
//     { className: 'two', emoji: '🙏', style: { bottom: '20%', right: '12%' } },
//     { className: 'three', emoji: '🌟', style: { top: '25%', right: '18%' } }
//   ]

//   return (
//     <div className="body">
//       {/* Animated particles */}
//       <div className="particle particle-1" style={{ left: '15%', animationDelay: '0s' }} />
//       <div className="particle particle-2" style={{ left: '30%', animationDelay: '2s' }} />
//       <div className="particle particle-3" style={{ left: '50%', animationDelay: '4s' }} />
//       <div className="particle particle-4" style={{ left: '70%', animationDelay: '1s' }} />
//       <div className="particle particle-5" style={{ left: '85%', animationDelay: '3s' }} />

//       {/* Floating apology icons */}
//       {floatingIcons.map((icon, idx) => (
//         <div key={idx} className={`apology-float ${icon.className}`} 
//              style={{ animationDelay: `${idx * 2}s`, ...icon.style }}>
//           {icon.emoji}
//         </div>
//       ))}

//       <div className="bg-shape shape-one" />
//       <div className="bg-shape shape-two" />
//       <div className="bg-shape shape-three" />

//       <div className="apology-card">
//         <BrandHeader />
//         <div className="content">
//           <div className="hero-section">
//             <h1>Let Me Make This Right</h1>
//             <p>Sometimes a sincere <br />"I'm sorry" <br />can begin the journey of healing</p>
//           </div>

//           <div className="field">
//             <label>Who You're Apologizing To</label>
//             <input 
//               type="text" 
//               placeholder="Enter their name"
//               value={receiverName}
//               onChange={(e) => setReceiverName(e.target.value)}
//             />
//           </div>

//           <div className="suggestions-title toggle" onClick={() => setShowSuggestions(!showSuggestions)}>
//             <span>Need apology inspiration?</span>
//             <span className={`dropdown-icon ${showSuggestions ? 'open' : ''}`}>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </span>
//           </div>

//           <div className={`suggestions-wrapper ${showSuggestions ? 'open' : ''}`}>
//             <div className="suggestions">
//               {suggestions.map((sugg, idx) => (
//                 <div key={idx} className="suggestion-box" onClick={() => fillText(sugg)}>
//                   {sugg}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="field">
//             <label>Your Apology Message</label>
//             <textarea 
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Write your sincere apology here..."
//               rows={4}
//             />
//           </div>

//           <div className="field">
//             <label>Record Your Voice Message</label>
//             {!isRecording && !audioPreview ? (
//               <button type="button" onClick={startRecording} className="record-btn">
//                 Start Recording
//               </button>
//             ) : isRecording ? (
//               <button type="button" onClick={stopRecording} className="stop-btn">
//                 Stop Recording
//               </button>
//             ) : null}
            
//             {audioPreview && (
//               <>
//                 <div className="voice-note-label">Listen to your recorded apology</div>
//                 <div className="voice-player">
//                   <button onClick={toggleAudio} className="play-btn">
//                     {isPlaying ? '⏸️' : '▶️'}
//                   </button>
//                   <div className="wave-bar">
//                     <div className="progress" 
//                          style={{ width: duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0 }} />
//                   </div>
//                   <span className="time-text">
//                     {formatTime(currentTime)} / {formatTime(duration)}
//                   </span>
//                   <audio 
//                     ref={audioRef} 
//                     src={audioPreview} 
//                     preload="auto"
//                   />
//                 </div>
//                 <button onClick={deleteAudio} className="delete-btn">
//                   Delete Recording
//                 </button>
//               </>
//             )}
//           </div>

//           <button onClick={sendMessage} className="apology-btn">
//             Send My Apology
//           </button>
//         </div>
//       </div>

//       {toastVisible && (
//         <div className="toast">
//           Your apology has been sent with love ❤️
//         </div>
//       )}

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        
//         * { margin: 0; padding: 0; box-sizing: border-box; }
        
//         html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        
//         .body {
//           min-height: 100vh;
//           width: 100vw;
//           background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b, #667eea);
//           background-size: 400% 400%;
//           animation: gradientShift 15s ease infinite;
//           color: white;
//           position: relative;
//           overflow: hidden;
//           padding: 16px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           box-sizing: border-box;
//           font-family: 'Poppins', sans-serif;
//         }
        
//         @keyframes gradientShift {
//          0%, 100% { background-position: 0% 50%; }
//          25% { background-position: 100% 50%; }
//          50% { background-position: 100% 100%; }
//          75% { background-position: 0% 100%; }
//         }
        
//         @keyframes float {
//          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
//          20% { opacity: 0.8; }
//          80% { opacity: 0.8; }
//          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
//         }
        
//         .particle {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//           animation: float 12s infinite linear;
//           box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
//           z-index: 1;
//         }
        
//         .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #d76d77, #ffaf7b); }
//         .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #3a1c71, #667eea); animation-duration: 14s; }
//         .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #ffaf7b, #d76d77); animation-duration: 11s; }
//         .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #667eea, #3a1c71); animation-duration: 13s; }
//         .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #d76d77, #ffaf7b); animation-duration: 15s; }
        
//         .apology-float {
//           position: absolute;
//           font-size: clamp(28px, 5vw, 36px);
//           opacity: 0.16;
//           animation: floatGentle 14s infinite ease-in-out;
//           filter: drop-shadow(0 4px 12px rgba(215, 109, 119, 0.4));
//           pointer-events: none;
//         }
        
//         @keyframes floatGentle {
//          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
//          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
//          66% { transform: translateY(-8px) rotate(240deg) scale(0.95); }
//         }
        
//         .one { animation-delay: 0s; }
//         .two { animation-delay: 4s; }
//         .three { animation-delay: 8s; }
        
//         .bg-shape {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.1;
//           filter: blur(6px);
//           animation: floatShape 20s infinite ease-in-out;
//         }
        
//         .shape-one { width: 140px; height: 140px; background: rgba(255, 215, 0, 0.3); top: 10%; left: 8%; }
//         .shape-two { width: 100px; height: 100px; background: rgba(255, 140, 0, 0.25); bottom: 20%; right: 10%; animation-direction: reverse; }
//         .shape-three { width: 80px; height: 80px; background: rgba(255, 215, 0, 0.2); top: 65%; left: 15%; }
        
//         @keyframes floatShape {
//          0%, 100% { transform: translateY(0px) scale(1); }
//          50% { transform: translateY(-25px) scale(1.08); }
//         }
        
//         .apology-card {
//           width: min(580px, 100%);
//           background: rgba(255, 255, 255, 0.12);
//           backdrop-filter: blur(28px);
//           border-radius: 32px;
//           padding: 36px 32px;
//           box-shadow: 0 30px 70px rgba(58, 28, 113, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.45);
//           /* Removed white border */
//           color: white;
//           position: relative;
//           z-index: 2;
//           animation: cardIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }
        
//         @keyframes cardIn {
//          from { opacity: 0; transform: translateY(30px) scale(0.97); }
//          to { opacity: 1; transform: translateY(0) scale(1); }
//         }
        
//         .content { position: relative; z-index: 2; }
        
//         .hero-section { text-align: center; margin-bottom: 32px; }
//         .hero-section h1 {
//           font-family: 'Dancing Script', cursive;
//           font-size: clamp(28px, 8vw, 36px);
//           font-weight: 700;
//           background: linear-gradient(135deg, #fff, #f8e8e8, #fff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin-bottom: 16px;
//           line-height: 1.1;
//           text-shadow: 0 6px 20px rgba(215, 109, 119, 0.4);
//         }
//         .hero-section p {
//           font-size: clamp(14px, 4vw, 16px);
//           opacity: 0.95;
//           line-height: 1.7;
//           font-weight: 300;
//         }
        
//         .field { margin-bottom: 24px; }
//         .field label {
//           display: block;
//           font-size: 15px;
//           margin-bottom: 12px;
//           opacity: 0.95;
//           font-weight: 500;
//         }
//         .field input, .field textarea {
//           width: 100%;
//           padding: 18px 20px;
//           border-radius: 24px;
//           border: none;
//           outline: none;
//           background: rgba(255, 255, 255, 0.92);
//           color: #333;
//           font-size: 15px;
//           backdrop-filter: blur(18px);
//           /* Removed white border */
//           transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           font-family: 'Inter', sans-serif;
//         }
//         .field input:focus, .field textarea:focus {
//           background: rgba(255, 255, 255, 1);
//           box-shadow: 0 12px 35px rgba(215, 109, 119, 0.3);
//           transform: translateY(-2px);
//         }
//         .field textarea { resize: none; min-height: 130px; }
        
//         .suggestions-title.toggle {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           cursor: pointer;
//           font-size: 15px;
//           margin: 20px 0 16px;
//           opacity: 0.95;
//           font-weight: 500;
//           padding: 14px 18px;
//           background: rgba(255, 255, 255, 0.16);
//           border-radius: 24px;
//           backdrop-filter: blur(14px);
//           /* Removed white border */
//           transition: all 0.3s ease;
//         }
//         .suggestions-title.toggle:hover {
//           background: rgba(255, 255, 255, 0.28);
//           transform: translateY(-2px);
//         }
//         .dropdown-icon {
//           transition: transform 0.3s ease;
//           font-size: 15px;
//           color: rgba(255, 255, 255, 0.9);
//         }
//         .dropdown-icon.open { transform: rotate(180deg); }
        
//         .suggestions-wrapper {
//           max-height: 0;
//           overflow: hidden;
//           transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           margin-bottom: 12px;
//         }
//         .suggestions-wrapper.open { max-height: 500px; }
//         .suggestions { margin-top: 12px; }
//         .suggestion-box {
//           background: rgba(255, 255, 255, 0.24);
//           padding: 18px 20px;
//           border-radius: 26px;
//           font-size: 15px;
//           margin-bottom: 16px;
//           cursor: pointer;
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           backdrop-filter: blur(14px);
//           /* Removed white border */
//           line-height: 1.6;
//           font-weight: 400;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//         }
//         .suggestion-box:hover {
//           background: rgba(255, 255, 255, 0.38);
//           transform: translateX(10px) scale(1.02);
//           box-shadow: 0 15px 40px rgba(215, 109, 119, 0.3);
//         }
        
//         .record-btn {
//           width: 100%;
//           padding: 18px;
//           border: none;
//           border-radius: 28px;
//           background: linear-gradient(135deg, #d76d77, #3a1c71);
//           color: white;
//           font-weight: 600;
//           font-size: 16px;
//           cursor: pointer;
//           box-shadow: 0 12px 35px rgba(215, 109, 119, 0.4);
//           transition: all 0.3s ease;
//         }
//         .record-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 18px 45px rgba(215, 109, 119, 0.55);
//         }
        
//         .stop-btn {
//           width: 100%;
//           padding: 18px;
//           border: none;
//           border-radius: 28px;
//           background: linear-gradient(135deg, #ff4d4d, #cc3333);
//           color: white;
//           font-weight: 600;
//           font-size: 16px;
//           cursor: pointer;
//           box-shadow: 0 12px 35px rgba(255, 77, 77, 0.4);
//           transition: all 0.3s ease;
//           animation: pulse 1.5s infinite;
//         }
        
//         @keyframes pulse {
//          0%, 100% { transform: scale(1); }
//          50% { transform: scale(1.02); }
//         }
        
//         .voice-note-label {
//           font-family: 'Dancing Script', cursive;
//           font-size: 20px;
//           text-align: center;
//           margin: 16px 0 12px;
//           background: linear-gradient(135deg, #ffd700, #ffed4e);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: fadeInSoft 0.8s ease;
//         }
        
//         @keyframes fadeInSoft {
//          from { opacity: 0; transform: translateY(10px); }
//          to { opacity: 1; transform: translateY(0); }
//         }
        
//         .voice-player {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding: 16px 20px;
//           border-radius: 32px;
//           background: linear-gradient(135deg, #ffd700, #ff8c00);
//           box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4);
//           transition: all 0.3s ease;
//         }
//         .voice-player:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 18px 45px rgba(255, 215, 0, 0.55);
//         }
        
//         .play-btn {
//           width: 48px;
//           height: 48px;
//           border-radius: 50%;
//           border: none;
//           background: white;
//           color: #d2691e;
//           font-size: 18px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
//         }
//         .play-btn:hover {
//           transform: scale(1.12);
//           background: #fff8dc;
//         }
        
//         .wave-bar {
//           flex: 1;
//           height: 8px;
//           background: rgba(255, 255, 255, 0.4);
//           border-radius: 12px;
//           overflow: hidden;
//           position: relative;
//         }
//         .progress {
//           height: 100%;
//           background: white;
//           transition: width 0.2s linear;
//           border-radius: 12px;
//         }
//         .time-text {
//           font-size: 13px;
//           color: white;
//           font-weight: 600;
//           min-width: 70px;
//           text-align: right;
//         }
        
//         .delete-btn {
//           margin-top: 14px;
//           width: 100%;
//           padding: 14px;
//           border-radius: 24px;
//           border: none;
//           background: rgba(255, 77, 77, 0.18);
//           color: #ff6b6b;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           backdrop-filter: blur(12px);
//           /* Removed white/red border */
//           border: none;
//         }
//         .delete-btn:hover {
//           background: rgba(255, 77, 77, 0.35);
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(255, 77, 77, 0.3);
//         }
        
//         .apology-btn {
//           width: 100%;
//           padding: 20px 28px;
//           border: none;
//           border-radius: 36px;
//           background: linear-gradient(135deg, #ffffff, #ffed4e, #ffd700);
//           color: #8b4513;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 700;
//           font-size: 17px;
//           cursor: pointer;
//           box-shadow: 0 15px 45px rgba(255, 215, 0, 0.5);
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           position: relative;
//           overflow: hidden;
//           margin-top: 16px;
//         }
//         .apology-btn:hover {
//           transform: translateY(-5px) scale(1.03);
//           box-shadow: 0 22px 55px rgba(255, 215, 0, 0.65);
//         }
        
//         .toast {
//           position: fixed;
//           bottom: 35px;
//           left: 50%;
//           transform: translateX(-50%);
//           background: rgba(255, 255, 255, 0.96);
//           color: #8b4513;
//           padding: 18px 32px;
//           border-radius: 40px;
//           font-size: 16px;
//           font-weight: 600;
//           box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
//           max-width: calc(100vw - 60px);
//           text-align: center;
//           z-index: 100;
//           animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           backdrop-filter: blur(25px);
//         }
        
//         @keyframes slideUp {
//          from { transform: translateX(-50%) translateY(50px); opacity: 0; }
//          to { transform: translateX(-50%) translateY(0); opacity: 1; }
//         }
        
//         @media (max-width: 768px) {
//           .body { padding: 14px; }
//           .apology-card { padding: 32px 28px; border-radius: 28px; }
//           .hero-section h1 { font-size: 30px; }
//         }
        
//         @media (max-width: 480px) {
//           .body { padding: 12px; }
//           .apology-card { padding: 28px 24px; border-radius: 24px; }
//           .hero-section h1 { font-size: 28px; }
//           .field textarea { min-height: 120px; padding: 16px; }
//         }
//       `}</style>
//     </div>
//   )
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter as useNextRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import BrandHeader from "../BrandHeader";

export default function ApologySpace() {
  const [message, setMessage] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioPreview, setAudioPreview] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const router = useNextRouter();
  const params = useNextSearchParams();
  const code = params.get("code");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(null);

  const suggestions = [
    "I'm truly sorry for hurting you 💔",
    "Please forgive me, I messed up 🙏",
    "I never meant to cause you pain 😔",
    "Let me make this right again 🤍",
  ];

  const fill = (text) => {
    setMessage(text);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioPreview(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission denied ❌");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const deleteAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioBlob(null);
    setAudioPreview("");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);

      const interval = setInterval(() => {
        if (audio.ended) {
          clearInterval(interval);
          setIsPlaying(false);
          setCurrentTime(0);
        } else if (audio.paused) {
          clearInterval(interval);
        } else {
          setCurrentTime(audio.currentTime);
        }
      }, 200);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioPreview) return;

    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioPreview]);

  useEffect(() => {
    if (!code) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/apology/login?code=${code}`);
    }
  }, [code, router]);

  const uploadAudio = async () => {
    if (!audioBlob) return "";
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "audio_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgdexbbk7/video/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Please write your apology message 💌");
      return;
    }

    if (receiverName.trim() === "") {
      alert("Enter receiver name");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      let uploadedAudioUrl = "";
      
      if (audioBlob) {
        uploadedAudioUrl = await uploadAudio();
      }

      const res = await fetch("/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrCode: code,
          receiverName: receiverName,
          receiverMobile: "1234567890",
          senderName: localStorage.getItem("sender_name"),
          senderMobile: localStorage.getItem("sender_mobile"),
          messageText: message,
          imageUrl: "",
          videoUrl: "",
          audioUrl: uploadedAudioUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send message");
        return;
      }

      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        router.push(`/apology/greet?code=${code}`);
      }, 1500);

      setMessage("");
      setReceiverName("");
      deleteAudio();
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const floatingIcons = [
    { className: "one", emoji: "💔", style: { top: "12%", left: "15%" } },
    { className: "two", emoji: "🕊️", style: { bottom: "20%", right: "12%" } },
    { className: "three", emoji: "🌧️", style: { top: "25%", right: "18%" } },
  ];

  return (
    <div className="body">
      {/* Animated particles */}
      <div className="particle particle-1" style={{ left: "15%", animationDelay: "0s" }} />
      <div className="particle particle-2" style={{ left: "30%", animationDelay: "2s" }} />
      <div className="particle particle-3" style={{ left: "50%", animationDelay: "4s" }} />
      <div className="particle particle-4" style={{ left: "70%", animationDelay: "1s" }} />
      <div className="particle particle-5" style={{ left: "85%", animationDelay: "3s" }} />

      {/* Floating apology icons */}
      {floatingIcons.map((icon, idx) => (
        <div
          key={idx}
          className={`apology-float ${icon.className}`}
          style={{
            animationDelay: `${idx * 2}s`,
            ...icon.style,
          }}
        >
          {icon.emoji}
        </div>
      ))}

      <div className="bg-shape shape-one" />
      <div className="bg-shape shape-two" />
      <div className="bg-shape shape-three" />

      <div className="apology-card">
        <BrandHeader />
        <div className="content">
          <div className="hero-section">
            <h1>Let Me Make This Right 💔</h1>
            <p>
              Sometimes a sincere "I'm sorry" 🤍 <br />
              can begin the journey of healing 🕊
            </p>
          </div>

          <div className="field">
            <label>Who You're Apologizing To</label>
            <input
              type="text"
              placeholder="Enter their name 🕊️"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
          </div>

          <div 
            className="suggestions-title toggle"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <span>Need apology inspiration? 💌</span>
            <span className={`dropdown-icon ${showSuggestions ? "open" : ""}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          
          <div className={`suggestions-wrapper ${showSuggestions ? "open" : ""}`}>
            <div className="suggestions">
              {suggestions.map((sugg, idx) => (
                <div
                  key={idx}
                  className="suggestion-box"
                  onClick={() => fill(sugg)}
                >
                  {sugg}
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Your Apology Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your sincere apology here..."
              rows={4}
            />
          </div>

          <div className="field">
            <label>Record Your Voice Message 🎙️</label>
            
            {!isRecording && !audioPreview ? (
              <button type="button" onClick={startRecording} className="record-btn">
                🎙️ Start Recording
              </button>
            ) : isRecording ? (
              <button type="button" onClick={stopRecording} className="stop-btn">
                ⏹️ Stop Recording
              </button>
            ) : null}

            {audioPreview && (
              <>
                <div className="voice-note-label">
                  🎙️ Listen to your recorded apology
                </div>

                <div className="voice-player">
                  <button onClick={toggleAudio} className="play-btn">
                    {isPlaying ? "⏸" : "▶"}
                  </button>

                  <div className="wave-bar">
                    <div
                      className="progress"
                      style={{
                        width: duration > 0
                          ? `${Math.min((currentTime / duration) * 100, 100)}%`
                          : "0%",
                      }}
                    />
                  </div>

                  <span className="time-text">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <audio ref={audioRef} src={audioPreview} preload="auto" />
                </div>

                <button onClick={deleteAudio} className="delete-btn">
                  🗑️ Delete Recording
                </button>
              </>
            )}
          </div>

          <button onClick={sendMessage} className="apology-btn">
            Send My Apology 💝
          </button>
        </div>
      </div>

      {toastVisible && (
        <div className="toast">
          💌 Your apology has been sent with love.
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(html), :global(body) {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .body {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b, #667eea);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          color: white;
          position: relative;
          overflow: hidden;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }
         

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float 12s infinite linear;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
        }

        .particle-1 { width: 8px; height: 8px; background: linear-gradient(45deg, #ffd700, #ffed4e); }
        .particle-2 { width: 6px; height: 6px; background: linear-gradient(45deg, #ff8c00, #ffd700); animation-duration: 14s; }
        .particle-3 { width: 10px; height: 10px; background: linear-gradient(45deg, #daa520, #f4a460); animation-duration: 10s; }
        .particle-4 { width: 7px; height: 7px; background: linear-gradient(45deg, #ff8c00, #ffd700); animation-duration: 13s; }
        .particle-5 { width: 9px; height: 9px; background: linear-gradient(45deg, #f4a460, #ffed4e); animation-duration: 15s; }

        .apology-float {
          position: absolute;
          font-size: clamp(28px, 5vw, 36px);
          opacity: 0.16;
          animation: floatGentle 14s infinite ease-in-out;
          filter: drop-shadow(0 4px 12px #d76d77);
          pointer-events: none;
        }

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-8px) rotate(240deg) scale(0.95); }
        }

        .one { animation-delay: 0s; }
        .two { animation-delay: 4s; }
        .three { animation-delay: 8s; }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(6px);
          animation: floatShape 20s infinite ease-in-out;
        }
        .shape-one { width: 140px; height: 140px; background: #d76d77; top: 10%; left: 8%; }
        .shape-two { width: 100px; height: 100px; background: #d76d77; bottom: 20%; right: 10%; animation-direction: reverse; }
        .shape-three { width: 80px; height: 80px; background: #d76d77; top: 65%; left: 15%; }

        @keyframes floatShape {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.08); }
        }

        .apology-card {
          width: min(580px, 100%);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(28px);
          border-radius: 32px;
          padding: 36px 32px;
          box-shadow: 
            0 30px 70px rgba(255, 107, 180, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: white;
          position: relative;
          z-index: 2;
          animation: cardIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .content { position: relative; z-index: 2; }

        .hero-section {
          text-align: center;
          margin-bottom: 20px;
        }
        .hero-section h1 {
          font-family: "Dancing Script", cursive;
          font-size: clamp(28px, 8vw, 36px);
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #f8e8e8, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          line-height: 1.1;
          text-shadow: none;
        }
        .hero-section p {
          font-size: clamp(14px, 4vw, 16px);
          opacity: 0.95;
          line-height: 1.7;
          font-weight: 300;
        }

        .field {
          margin-bottom: 10px;
        }
        .field label {
          display: block;
          font-size: 15px;
          margin-bottom: 10px;
          opacity: 0.95;
          font-weight: 500;
        }

        .field input,
        .field textarea {
          width: 100%;
          padding: 18px 20px;
          border-radius: 24px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.92);
          color: #333;
          font-size: 15px;
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: "Inter", sans-serif;
        }
        .field input:focus,
        .field textarea:focus {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 12px 35px #d76d77;
          transform: translateY(-2px);
        }
        .field textarea {
          resize: none;
          min-height: 130px;
        }

        .suggestions-title.toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 15px;
          opacity: 0.95;
          font-weight: 500;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          backdrop-filter: blur(14px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .suggestions-title.toggle:hover {
          background: rgba(255, 255, 255, 0.28);
          transform: translateY(-2px);
        }
        .dropdown-icon {
          transition: transform 0.3s ease;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.9);
        }
        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .suggestions-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 12px;
        }
        .suggestions-wrapper.open {
          max-height: 500px;
        }
        .suggestions { margin-top: 15px; }
        .suggestion-box {
          background: rgba(255, 255, 255, 0.24);
          padding: 18px 20px;
          border-radius: 26px;
          font-size: 15px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          line-height: 1.6;
          font-weight: 400;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        .suggestion-box:hover {
          background: rgba(255, 255, 255, 0.38);
          transform: translateX(10px) scale(1.02);
          box-shadow: 0 15px 40px #d76d77;
        }

        .record-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 107, 180, 0.4);
          transition: all 0.3s ease;
        }
        .record-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 45px rgba(255, 107, 180, 0.55);
        }

        .stop-btn {
          width: 100%;
          padding: 18px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(135deg, #ff4d4d, #cc3333);
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(255, 77, 77, 0.4);
          transition: all 0.3s ease;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .voice-note-label {
          font-family: "Dancing Script", cursive;
          font-size: 20px;
          text-align: center;
          margin: 16px 0 12px;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInSoft 0.8s ease;
        }

        .voice-player {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 15px;
          border-radius: 32px;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          box-shadow: 0 12px 35px rgba(196, 82, 207, 0.4);
          transition: all 0.3s ease;
        }
        .voice-player:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 45px rgba(244, 106, 225, 0.55);
        }

        .play-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: white;
          color: #d2691e;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .play-btn:hover {
          transform: scale(1.12);
          background: #fff8dc;
        }

        .wave-bar {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .progress {
          height: 100%;
          background: white;
          transition: width 0.2s linear;
          border-radius: 12px;
        }

        .time-text {
          font-size: 13px;
          color: white;
          font-weight: 600;
          min-width: 70px;
          text-align: right;
        }

        .delete-btn {
          margin-top: 14px;
          width: 100%;
          padding: 14px;
          border-radius: 24px;
          border: none;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          color: #fbf7f7;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 77, 77, 0.3);
        }
        .delete-btn:hover {
          background: rgba(255, 77, 77, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 77, 77, 0.3);
        }

        .apology-btn {
          width: 100%;
          padding: 16px 24px;
          border: none;
          border-radius: 35px;
          background: linear-gradient(135deg, #d76d77, #3a1c71, #ffaf7b);
          background-size: 300% 300%;
          color: #fff;
          cursor: pointer;
          margin-top: 0px;
          font-size: 16px;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 12px 35px rgba(215, 109, 119, 0.5);
          animation: fadeInUp 1s ease-out 0.9s both;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .apology-btn:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 22px 55px rgba(230, 0, 255, 0.65);
        }

        .toast {
          position: fixed;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.96);
          color: #8b4513;
          padding: 18px 32px;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.3);
          max-width: calc(100vw - 60px);
          text-align: center;
          z-index: 100;
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(25px);
        }

        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInSoft {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .body { padding: 14px; }
          .apology-card { padding: 32px 28px; border-radius: 28px; }
          .hero-section h1 { font-size: 30px; }
        }

        @media (max-width: 480px) {
          .body { padding: 12px; }
          .apology-card { padding: 28px 24px; border-radius: 24px; }
          .hero-section h1 { font-size: 28px; }
          .field textarea { min-height: 120px; padding: 16px; }
        }
      `}</style>
    </div>
  );
}