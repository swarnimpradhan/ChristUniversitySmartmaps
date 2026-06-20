import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Map, Navigation, User, Coffee, 
  Compass, Search, Menu, X, ChevronRight, Calendar, 
  Mail, Info, Sun, Moon, Sparkles, LogIn, CheckCircle2 
} from 'lucide-react';
import { CAMPUS_DATA, FACULTY_DATA, processChatQuery } from './campusData';
import './App.css';

function App() {
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am your Christ University Kengeri Campus Smart Assistant. How can I help you today? You can ask me about faculty locations, classroom layouts, canteens, or directions!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      richContent: {
        type: 'greeting',
        suggestions: [
          'Where is Dr. Anjali?',
          'Show available canteens',
          'Where is Block 1?',
          'Who is available in CSE?'
        ]
      }
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null); // 'academic' | 'food' | 'hostel' | 'sports' | 'faculty' | null
  const [timetableModal, setTimetableModal] = useState(null); // teacher object or null

  const messagesEndRef = useRef(null);

  // Apply theme class to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSend = (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      const response = processChatQuery(queryText);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        richContent: response
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Helper to trigger query from sidebar or chips
  const triggerQuery = (queryText) => {
    handleSend(queryText);
    setSidebarOpen(false);
    setActiveDrawer(null);
  };

  // Deep link to parent map
  const openParentMap = (params) => {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      window.parent.postMessage({ type: 'MAP_COMMAND', params: params }, '*');
    } else {
      // Open the index.html from parent folder with parameters
      const parentUrl = `../index.html?${params}`;
      window.open(parentUrl, '_blank');
    }
  };


  // Render Rich Card based on response type
  const renderRichContent = (content) => {
    if (!content) return null;

    switch (content.type) {
      case 'teacher_info':
        const teacher = content.teacher;
        return (
          <div className="rich-container">
            <div className="teacher-card">
              <div className="teacher-card-header">
                <div>
                  <div className="teacher-name">{teacher.name}</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                    <span className="teacher-dept">{teacher.department}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{teacher.designation}</span>
                  </div>
                </div>
                <span className={`status-badge ${teacher.status.toLowerCase()}`}>
                  {content.statusStr}
                </span>
              </div>
              
              <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={14} color="var(--primary)" />
                  <span>Cabin: <strong>{teacher.cabin}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="var(--accent-cyan)" />
                  <span>{teacher.email}</span>
                </div>
              </div>

              {teacher.statusNotice && (
                <div className="teacher-notice">
                  {teacher.statusNotice}
                </div>
              )}

              <div className="card-actions">
                <button className="card-btn primary" onClick={() => setTimetableModal(teacher)}>
                  <Calendar size={14} /> Timetable
                </button>
                <button className="card-btn" onClick={() => openParentMap(`search=${encodeURIComponent(teacher.cabin.split(' - ')[0])}`)}>
                  <Map size={14} /> Find Cabin
                </button>
              </div>
            </div>
            {renderSuggestions(content.suggestions)}
          </div>
        );

      case 'timetable':
        return (
          <div className="rich-container">
            {renderTimetable(content.teacher)}
          </div>
        );

      case 'building_info':
        const building = content.building;
        return (
          <div className="rich-container">
            <div className="landmark-card">
              <div className="landmark-header">
                <div className="brand-icon-box" style={{ width: '30px', height: '30px', borderRadius: '6px' }}>
                  <Map size={16} />
                </div>
                <div>
                  <div className="landmark-title">{building.name}</div>
                  <span className={`landmark-category ${building.category}`}>
                    {building.category}
                  </span>
                </div>
              </div>
              <p className="landmark-desc">{building.description}</p>
              <div className="card-actions">
                <button className="card-btn primary" onClick={() => openParentMap(`search=${encodeURIComponent(building.name)}`)}>
                  <Map size={14} /> Locate on Map
                </button>
                <button className="card-btn" onClick={() => openParentMap(`start=gate&end=${building.id}`)}>
                  <Navigation size={14} /> Directions from Gate
                </button>
              </div>
            </div>
            {renderSuggestions(content.suggestions)}
          </div>
        );

      case 'list_canteens':
        return (
          <div className="rich-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}>
              {content.canteens.map(cant => (
                <div key={cant.id} className="landmark-card" style={{ padding: '12px' }}>
                  <div className="flex justify-between items-center w-full">
                    <span className="landmark-title" style={{ fontSize: '14.5px' }}>{cant.name}</span>
                    <button className="card-btn" style={{ padding: '6px 10px', fontSize: '11px', flex: 'none' }} onClick={() => openParentMap(`search=${encodeURIComponent(cant.name)}`)}>
                      Locate
                    </button>
                  </div>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{cant.description}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'list_sports':
        return (
          <div className="rich-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}>
              {content.sportsSpots.map(sport => (
                <div key={sport.id} className="landmark-card" style={{ padding: '12px' }}>
                  <div className="flex justify-between items-center w-full">
                    <span className="landmark-title" style={{ fontSize: '14.5px' }}>{sport.name}</span>
                    <button className="card-btn" style={{ padding: '6px 10px', fontSize: '11px', flex: 'none' }} onClick={() => openParentMap(`search=${encodeURIComponent(sport.name)}`)}>
                      Locate
                    </button>
                  </div>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{sport.description}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'department_faculty':
        return (
          <div className="rich-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '420px' }}>
              {content.members.length > 0 ? (
                content.members.map(member => (
                  <div key={member.id} className="flex justify-between items-center" style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <div className="teacher-name" style={{ fontSize: '14px' }}>{member.name}</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cabin: {member.cabin}</span>
                    </div>
                    <button className="card-btn" style={{ padding: '6px 10px', fontSize: '11px', flex: 'none' }} onClick={() => triggerQuery(`Where is ${member.name}?`)}>
                      Ask Bot
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>No faculty members found in this department database.</div>
              )}
            </div>
          </div>
        );

      case 'available_faculty':
        return (
          <div className="rich-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '420px' }}>
              {content.members.map(member => (
                <div key={member.id} className="flex justify-between items-center" style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div className="teacher-name" style={{ fontSize: '14px' }}>{member.name}</div>
                    <span style={{ fontSize: '11.5px', color: 'var(--success)' }}>Available in {member.cabin.split(' - ')[0]}</span>
                  </div>
                  <button className="card-btn" style={{ padding: '6px 10px', fontSize: '11px', flex: 'none' }} onClick={() => triggerQuery(`Where is ${member.name}?`)}>
                    Ask Bot
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'route_info':
        return (
          <div className="rich-container">
            <div className="landmark-card" style={{ maxWidth: '420px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="brand-icon-box" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--success)' }}>
                  <Navigation size={16} />
                </div>
                <div>
                  <div className="landmark-title" style={{ fontSize: '14.5px' }}>Route Directions Loaded</div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>From {content.startName} to {content.endName}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Clicking the button below will load the map page and automatically draw the walking route directions.</p>
              <button className="card-btn primary w-full" onClick={() => openParentMap(`start=${content.startId}&end=${content.endId}`)}>
                <Navigation size={14} /> Open Live Map Routing
              </button>
            </div>
          </div>
        );

      case 'greeting':
      case 'fallback':
        return (
          <div className="rich-container">
            {renderSuggestions(content.suggestions)}
          </div>
        );

      default:
        return null;
    }
  };

  // Render suggested prompt chips
  const renderSuggestions = (suggestions) => {
    if (!suggestions || suggestions.length === 0) return null;
    return (
      <div className="suggestions-wrapper">
        {suggestions.map((s, idx) => (
          <button key={idx} className="suggestion-chip" onClick={() => triggerQuery(s)}>
            {s}
          </button>
        ))}
      </div>
    );
  };

  // Render Timetable Grid
  const renderTimetable = (teacher) => {
    if (!teacher || !teacher.timetable) return null;
    const periods = ["P1", "P2", "P3", "P4", "P5", "P6"];

    return (
      <div className="timetable-container">
        <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: '13px' }}>Timetable: {teacher.name}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>P1-P6 Slots</span>
        </div>
        <div className="timetable-grid">
          <div className="grid-header">Day</div>
          {periods.map(p => <div key={p} className="grid-header">{p}</div>)}

          {teacher.timetable.map(row => (
            <React.Fragment key={row.day}>
              <div className="grid-header" style={{ borderBottom: 'none' }}>{row.day}</div>
              {periods.map(p => {
                const val = row[p.toLowerCase()];
                let cellClass = "grid-cell";
                if (val === "LUNCH") cellClass += " lunch-slot";
                else if (val === "HALF DAY") cellClass += " halfday-slot";
                else if (val && val !== "FREE" && val !== "LUNCH") cellClass += " active-slot";
                
                return (
                  <div key={p} className={cellClass}>
                    {val === "FREE" ? "-" : val}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Open Drawer handler
  const openDrawer = (type) => {
    setActiveDrawer(type);
    setSidebarOpen(false);
  };

  // Get data for drawer list
  const getDrawerListItems = () => {
    switch (activeDrawer) {
      case 'academic':
        return Object.values(CAMPUS_DATA.buildings).filter(b => b.category === 'academic');
      case 'food':
        return Object.values(CAMPUS_DATA.buildings).filter(b => b.category === 'food');
      case 'hostel':
        return Object.values(CAMPUS_DATA.buildings).filter(b => b.category === 'hostel');
      case 'sports':
        return Object.values(CAMPUS_DATA.buildings).filter(b => b.category === 'sports');
      case 'faculty':
        return FACULTY_DATA;
      default:
        return [];
    }
  };

  return (
    <div className={isIframe ? 'iframe-mode' : ''} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
      
      {/* App Header */}
      {!isIframe && (
        <header className="app-header">
          <div className="brand-wrapper">
            <button className="action-btn" style={{ display: 'none', marginRight: '6px' }} id="mobile-menu-trigger" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
            <div className="brand-icon-box">
              <MessageSquare size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="brand-title">CHRIST Smart Map</span>
                <Sparkles size={14} color="var(--primary)" />
              </div>
              <span className="brand-subtitle">AI Assistant & Navigator</span>
            </div>
          </div>

          <div className="header-actions">
            <button className="action-btn" onClick={() => window.open('../index.html', '_self')} title="Open Campus Map">
              <Map size={18} />
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Light/Dark Mode">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div className="app-content">
        
        {/* Left Sidebar */}
        {!isIframe && (
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="sidebar-title" style={{ marginBottom: 0 }}>
                <Compass size={16} /> Explorer
              </span>
              <button className="action-btn" style={{ display: 'none', width: '28px', height: '28px' }} id="mobile-sidebar-close" onClick={() => setSidebarOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <div className="sidebar-section" style={{ flex: 1, overflowY: 'auto' }}>
              <div className="category-list">
                <button className={`category-item ${activeDrawer === 'academic' ? 'active' : ''}`} onClick={() => openDrawer('academic')}>
                  <Compass className="category-icon" size={16} />
                  <span>Academic Blocks</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
                <button className={`category-item ${activeDrawer === 'faculty' ? 'active' : ''}`} onClick={() => openDrawer('faculty')}>
                  <User className="category-icon" size={16} />
                  <span>Faculty Directory</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
                <button className={`category-item ${activeDrawer === 'food' ? 'active' : ''}`} onClick={() => openDrawer('food')}>
                  <Coffee className="category-icon" size={16} />
                  <span>Canteens & Dining</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
                <button className={`category-item ${activeDrawer === 'hostel' ? 'active' : ''}`} onClick={() => openDrawer('hostel')}>
                  <Map className="category-icon" size={16} />
                  <span>Student Hostels</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
                <button className={`category-item ${activeDrawer === 'sports' ? 'active' : ''}`} onClick={() => openDrawer('sports')}>
                  <Compass className="category-icon" size={16} />
                  <span>Sports & Recreation</span>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
              </div>
            </div>
            
            <div className="sidebar-section" style={{ borderBottom: 'none', padding: '16px 20px', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Info size={14} color="var(--text-muted)" />
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Connected to Kengeri Campus database.</span>
              </div>
            </div>
          </aside>
        )}

        {/* Right Chat Area */}
        <main className="chat-container">
          
          {messages.length === 0 ? (
            <div className="empty-chat-welcome">
              <div className="welcome-logo-pulse">
                <MessageSquare size={28} />
              </div>
              <h2 className="welcome-title">Christ Smart Assistant</h2>
              <p className="welcome-desc">
                Welcome to the student helper chatbot! Ask me anything about faculty, cabins, timetables, or get navigation coordinates for the Kengeri campus map.
              </p>
              <div className="welcome-prompts-grid">
                <div className="welcome-prompt-card" onClick={() => triggerQuery('Where is Dr. Anjali?')}>
                  <span className="prompt-card-title">Locate Faculty Cabin</span>
                  <span className="prompt-card-desc">"Where is Dr. Anjali?"</span>
                </div>
                <div className="welcome-prompt-card" onClick={() => triggerQuery('Show available canteens')}>
                  <span className="prompt-card-title">Find Campus Dining</span>
                  <span className="prompt-card-desc">"Show canteens on campus"</span>
                </div>
                <div className="welcome-prompt-card" onClick={() => triggerQuery('Directions to Block 3')}>
                  <span className="prompt-card-title">Navigate Campus</span>
                  <span className="prompt-card-desc">"Directions to Block 3"</span>
                </div>
                <div className="welcome-prompt-card" onClick={() => triggerQuery('Who is available in CSE?')}>
                  <span className="prompt-card-title">Check Cabin Status</span>
                  <span className="prompt-card-desc">"Who is available in CSE?"</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                  <div className="avatar-box">
                    {msg.sender === 'bot' ? <MessageSquare size={16} /> : <User size={16} />}
                  </div>
                  <div>
                    <div className="message-bubble">
                      {msg.text}
                      {msg.sender === 'bot' && renderRichContent(msg.richContent)}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left', padding: '0 4px' }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message-wrapper bot">
                  <div className="avatar-box">
                    <MessageSquare size={16} />
                  </div>
                  <div className="message-bubble" style={{ padding: '8px 12px' }}>
                    <div className="typing-indicator">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <div className="input-icon-box">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Ask about faculty cabin, canteens, directions..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                className="send-btn" 
                onClick={() => handleSend()}
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Side Drawer Overlay for Explorer list */}
          {activeDrawer && (
            <div className="drawer-overlay">
              <div className="drawer-header">
                <span className="drawer-title">
                  {activeDrawer === 'academic' && 'Academic Blocks'}
                  {activeDrawer === 'food' && 'Canteens & Dining'}
                  {activeDrawer === 'hostel' && 'Student Hostels'}
                  {activeDrawer === 'sports' && 'Sports & Amenity'}
                  {activeDrawer === 'faculty' && 'Faculty Directory'}
                </span>
                <button className="drawer-close" onClick={() => setActiveDrawer(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="drawer-body">
                {getDrawerListItems().map(item => (
                  <div 
                    key={item.id} 
                    className="drawer-list-item"
                    onClick={() => triggerQuery(activeDrawer === 'faculty' ? `Where is ${item.name}?` : `Where is ${item.name}?`)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <strong style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{item.name}</strong>
                      <ChevronRight size={14} color="var(--text-muted)" />
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {activeDrawer === 'faculty' ? `${item.designation} • ${item.department}` : item.description.substring(0, 70) + '...'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timetable Floating Modal */}
          {timetableModal && (
            <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }} onClick={() => setTimetableModal(null)}>
              <div className="timetable-container" style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '16px', position: 'relative', width: '90%', maxWidth: '560px', boxShadow: 'var(--glass-shadow)', border: '1px solid var(--border-color)' }} onClick={(e) => e.stopPropagation()}>
                <button 
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                  onClick={() => setTimetableModal(null)}
                >
                  <X size={20} />
                </button>
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar color="var(--primary)" size={20} /> Timetable Schedule
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{timetableModal.name} &bull; {timetableModal.designation}</p>
                </div>
                {renderTimetable(timetableModal)}
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Dynamic Mobile CSS injection */}
      <style>{`
        @media (max-width: 868px) {
          #mobile-menu-trigger {
            display: flex !important;
          }
          #mobile-sidebar-close {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
