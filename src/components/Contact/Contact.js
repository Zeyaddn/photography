"use client";
import { useState, useCallback } from "react";

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];

const PACKAGES = [
  { id: 'pkg_basic', name: 'Basic Portrait', price: '$299', icon: 'bx-camera', desc: '2-hour outdoor session + 20 retouched images' },
  { id: 'pkg_branding', name: 'Premium Branding', price: '$699', icon: 'bx-briefcase-alt-2', desc: 'Full day + 50 edited images + Album' },
  { id: 'pkg_event', name: 'Event Coverage', price: '$999', icon: 'bx-party', desc: 'Full event + All RAW files + 100 edits' }
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [selectedPkgId, setSelectedPkgId] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", email: "", phone: "", service: "", message: "", date: "", time: "" 
  });
  const [bookingRef, setBookingRef] = useState("");

  const validateStep1 = useCallback(() => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.service) errs.service = "Please select a service";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const validateStep2 = useCallback(() => {
    const errs = {};
    if (!formData.date) errs.date = "Please pick a date";
    if (!formData.time) errs.time = "Please select a time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => { if (step > 1) { setErrors({}); setStep(step - 1); } };

  const handlePackageSelect = (pkg) => {
    setSelectedPkgId(pkg.id);
    setFormData(prev => ({ ...prev, service: pkg.name }));
    setErrors(prev => ({ ...prev, service: undefined }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const submitBooking = (e) => {
    e.preventDefault();
    const ref = "LENS-" + Math.floor(Math.random() * 900000 + 100000);
    setBookingRef(ref);
    setStep(4);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPkgId("");
    setFormData({ name: "", email: "", phone: "", service: "", message: "", date: "", time: "" });
    setBookingRef("");
    setErrors({});
  };

  const today = new Date().toISOString().split('T')[0];
  const selectedPkg = PACKAGES.find(p => p.id === selectedPkgId);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="contact" className="py-100">
      <div className="container">
        <div className="section-header text-center mb-5 animate-on-scroll">
          <span className="section-tag-modern">Get in Touch</span>
          <h2 className="display-title text-white" style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: '900' }}>
            Let's <span style={{ color: "var(--primary)" }}>Work</span> Together
          </h2>
          <p className="text-light-3 max-width-600 mx-auto">
            Have a photography project in mind? Book your session now and let's create something amazing.
          </p>
        </div>

        <div className="row g-5 align-items-stretch">
          <div className="col-lg-5 animate-on-scroll">
            <div className="contact-info-card h-100">
              <h3 className="contact-card-title">
                <i className='bx bx-info-circle'></i> Contact Info
              </h3>
              
              <div className="contact-info-item mb-4">
                <div className="contact-info-icon"><i className='bx bx-map'></i></div>
                <div>
                  <h4 className="text-white mb-1">Location</h4>
                  <p className="mb-0">Riyadh, Saudi Arabia</p>
                </div>
              </div>

              <div className="contact-info-item mb-4">
                <div className="contact-info-icon"><i className='bx bx-envelope'></i></div>
                <div>
                  <h4 className="text-white mb-1">Email</h4>
                  <a href="mailto:ahmed@lensofcreativity.com" className="text-primary text-decoration-underline">ahmed@lensofcreativity.com</a>
                </div>
              </div>

              <div className="contact-info-item mb-5">
                <div className="contact-info-icon"><i className='bx bx-phone'></i></div>
                <div>
                  <h4 className="text-white mb-1">Phone</h4>
                  <a href="tel:+966501234567" className="text-primary text-decoration-underline">+966 50 123 4567</a>
                </div>
              </div>

              {/* Pricing Packages */}
              <div className="pricing-mini-container mt-auto">
                <h4 className="pricing-title text-white mb-3" style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <i className='bx bxs-offer' style={{color:"var(--success-green)"}}></i> Select a Package
                </h4>
                
                {PACKAGES.map((pkg) => (
                  <button 
                    key={pkg.id}
                    type="button"
                    className={`pricing-item-btn ${selectedPkgId === pkg.id ? 'selected' : ''}`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="d-flex align-items-center gap-2">
                        <i className={`bx ${pkg.icon}`} style={{ color: selectedPkgId === pkg.id ? 'var(--success-green)' : 'var(--primary)', fontSize: '1.2rem' }}></i>
                        <span className="text-white fw-bold">{pkg.name}</span>
                      </span>
                      <span className="price">{pkg.price}</span>
                    </div>
                    <p className="small text-light-3 mb-0 ps-4">{pkg.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7 animate-on-scroll">
            <div className="contact-form-card h-100">
              <h3 className="contact-card-title">
                <i className='bx bx-calendar-check'></i> Book a Session
              </h3>
              
              {step < 4 ? (
                <>
                  {/* Visual Progress Steps */}
                  <div className="booking-steps">
                    <div className="booking-step-line"></div>
                    {[
                      { num: 1, label: "Details" },
                      { num: 2, label: "Schedule" },
                      { num: 3, label: "Confirm" }
                    ].map(s => (
                      <div key={s.num} className={`booking-step ${step >= s.num ? 'active' : ''}`}>
                        <span>{step > s.num ? <i className='bx bx-check' style={{fontSize:'1.2rem'}}></i> : s.num}</span>
                        <small className="text-light-3">{s.label}</small>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={submitBooking}>
                    {/* ===== STEP 1: Details ===== */}
                    {step === 1 && (
                      <div className="form-step-v2">
                        <div className="row g-4">
                          <div className="col-md-6">
                            <label htmlFor="name" className="label-premium">
                              <i className='bx bx-user' style={{color: 'var(--primary)', marginRight: '5px'}}></i> Full Name *
                            </label>
                            <input 
                              id="name"
                              type="text" 
                              className={`form-control-custom ${errors.name ? 'error-border' : ''}`}
                              placeholder="e.g. Ahmed Mohammed"
                              value={formData.name} 
                              onChange={e => handleChange('name', e.target.value)} 
                            />
                            {errors.name && <span className="field-error"><i className='bx bx-error-circle'></i> {errors.name}</span>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="label-premium">
                              <i className='bx bx-envelope' style={{color: 'var(--primary)', marginRight: '5px'}}></i> Email Address *
                            </label>
                            <input 
                              id="email"
                              type="email" 
                              className={`form-control-custom ${errors.email ? 'error-border' : ''}`}
                              placeholder="ahmed@example.com"
                              value={formData.email} 
                              onChange={e => handleChange('email', e.target.value)} 
                            />
                            {errors.email && <span className="field-error"><i className='bx bx-error-circle'></i> {errors.email}</span>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="phone" className="label-premium">
                              <i className='bx bx-phone' style={{color: 'var(--primary)', marginRight: '5px'}}></i> Phone Number *
                            </label>
                            <input 
                              id="phone"
                              type="tel" 
                              className={`form-control-custom ${errors.phone ? 'error-border' : ''}`}
                              placeholder="+966 50 XXX XXXX"
                              value={formData.phone} 
                              onChange={e => handleChange('phone', e.target.value)} 
                            />
                            {errors.phone && <span className="field-error"><i className='bx bx-error-circle'></i> {errors.phone}</span>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="service" className="label-premium">
                              <i className='bx bx-camera' style={{color: 'var(--primary)', marginRight: '5px'}}></i> Service Type *
                            </label>
                            <select 
                              id="service"
                              className={`form-control-custom ${errors.service ? 'error-border' : ''}`}
                              value={formData.service} 
                              onChange={e => handleChange('service', e.target.value)}
                            >
                              <option value="" disabled>Select a specialty...</option>
                              <option value="Nature & Landscape">Nature & Landscape</option>
                              <option value="Architecture & Interiors">Architecture & Interiors</option>
                              <option value="Portrait & Branding">Portrait & Branding</option>
                              <option value="Event Photography">Event Photography</option>
                              {selectedPkg && <option value={selectedPkg.name}>{selectedPkg.name} (Package)</option>}
                            </select>
                            {errors.service && <span className="field-error"><i className='bx bx-error-circle'></i> {errors.service}</span>}
                          </div>
                          <div className="col-12">
                            <label htmlFor="message" className="label-premium">
                              <i className='bx bx-message-dots' style={{color: 'var(--primary)', marginRight: '5px'}}></i> Additional Notes <span style={{color:'#999', fontWeight:'400'}}>(Optional)</span>
                            </label>
                            <textarea 
                              id="message"
                              className="form-control-custom"
                              placeholder="Tell us more about your project, location preferences, style..."
                              rows="3"
                              value={formData.message} 
                              onChange={e => handleChange('message', e.target.value)} 
                            />
                          </div>
                        </div>
                        <button type="button" className="btn-primary-glow w-100 mt-5 step-btn" onClick={nextStep}>
                          <span>Next Step: Choose Schedule</span>
                          <i className='bx bx-right-arrow-alt' style={{fontSize: '1.3rem'}}></i>
                        </button>
                      </div>
                    )}

                    {/* ===== STEP 2: Schedule ===== */}
                    {step === 2 && (
                      <div className="form-step-v2">
                        <div className="mb-4">
                          <label htmlFor="date" className="label-premium">
                            <i className='bx bx-calendar' style={{color: 'var(--primary)', marginRight: '5px'}}></i> 1. Pick a Date *
                          </label>
                          <input 
                            id="date"
                            type="date" 
                            className={`form-control-custom ${errors.date ? 'error-border' : ''}`}
                            min={today}
                            value={formData.date} 
                            onChange={e => handleChange('date', e.target.value)} 
                          />
                          {errors.date && <span className="field-error"><i className='bx bx-error-circle'></i> {errors.date}</span>}
                          {formData.date && (
                            <div className="selected-date-tag">
                              <i className='bx bx-check-circle'></i>
                              {formatDate(formData.date)}
                            </div>
                          )}
                        </div>
                        
                        <label className="label-premium mb-3">
                          <i className='bx bx-time-five' style={{color: 'var(--primary)', marginRight: '5px'}}></i> 2. Available Time Slots *
                        </label>
                        {errors.time && <span className="field-error mb-3"><i className='bx bx-error-circle'></i> {errors.time}</span>}
                        <div className="time-slot-grid">
                          {TIME_SLOTS.map((t) => (
                            <button 
                              key={t}
                              type="button"
                              className={`time-btn ${formData.time === t ? 'active' : ''}`}
                              onClick={() => handleChange('time', t)}
                            >
                              <i className='bx bx-time-five' style={{fontSize: '0.9rem', marginRight: '4px'}}></i>
                              {t}
                            </button>
                          ))}
                        </div>

                        <div className="d-flex gap-3 mt-5">
                          <button type="button" className="btn-outline-white flex-fill py-3 step-btn" onClick={prevStep}>
                            <i className='bx bx-left-arrow-alt'></i> Back
                          </button>
                          <button type="button" className="btn-primary-glow flex-fill py-3 step-btn" onClick={nextStep}>
                            <span>Review Booking</span> <i className='bx bx-right-arrow-alt'></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ===== STEP 3: Review & Confirm ===== */}
                    {step === 3 && (
                      <div className="form-step-v2">
                        <div className="review-card">
                          <div className="review-header">
                            <i className='bx bx-check-shield review-header-icon'></i>
                            <div>
                              <h5>Review Your Booking</h5>
                              <p>Please confirm all details are correct before submitting.</p>
                            </div>
                          </div>

                          <div className="review-grid">
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-user'></i></div>
                              <div>
                                <span className="review-label">Full Name</span>
                                <span className="review-value">{formData.name}</span>
                              </div>
                            </div>
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-envelope'></i></div>
                              <div>
                                <span className="review-label">Email</span>
                                <span className="review-value">{formData.email}</span>
                              </div>
                            </div>
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-phone'></i></div>
                              <div>
                                <span className="review-label">Phone</span>
                                <span className="review-value">{formData.phone}</span>
                              </div>
                            </div>
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-camera'></i></div>
                              <div>
                                <span className="review-label">Service</span>
                                <span className="review-value">{formData.service}</span>
                              </div>
                            </div>
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-calendar'></i></div>
                              <div>
                                <span className="review-label">Date</span>
                                <span className="review-value">{formatDate(formData.date)}</span>
                              </div>
                            </div>
                            <div className="review-item">
                              <div className="review-item-icon"><i className='bx bx-time-five'></i></div>
                              <div>
                                <span className="review-label">Time</span>
                                <span className="review-value">{formData.time}</span>
                              </div>
                            </div>
                          </div>

                          {selectedPkg && (
                            <div className="review-package-badge">
                              <i className='bx bxs-offer'></i>
                              <span>Package: <strong>{selectedPkg.name}</strong> — <strong className="text-success-green">{selectedPkg.price}</strong></span>
                            </div>
                          )}

                          {formData.message && (
                            <div className="review-notes">
                              <span className="review-label">Additional Notes</span>
                              <p>{formData.message}</p>
                            </div>
                          )}
                        </div>

                        <div className="d-flex gap-3 mt-4">
                          <button type="button" className="btn-outline-white flex-fill py-3 step-btn" onClick={prevStep}>
                            <i className='bx bx-edit'></i> Edit Details
                          </button>
                          <button type="submit" className="btn-primary-glow flex-fill py-3 step-btn confirm-btn">
                            <i className='bx bx-check-double'></i> <span>Confirm & Book Now</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                /* ===== STEP 4: Success ===== */
                <div className="booking-success">
                  <div className="success-anim-wrapper">
                    <div className="success-circle-bg"></div>
                    <i className='bx bx-check-double success-icon-big'></i>
                  </div>
                  
                  <h4 className="success-title">Booking Confirmed!</h4>
                  <p className="success-subtitle">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your photography session has been successfully booked.
                  </p>
                  
                  {/* Digital Receipt */}
                  <div className="success-receipt">
                    <div className="receipt-header">
                      <i className='bx bx-receipt'></i>
                      <span>Booking Receipt</span>
                    </div>
                    <div className="receipt-body">
                      <div className="receipt-row">
                        <span className="receipt-label">Reference ID</span>
                        <span className="receipt-value receipt-ref">{bookingRef}</span>
                      </div>
                      <div className="receipt-divider"></div>
                      <div className="receipt-row">
                        <span className="receipt-label">Client</span>
                        <span className="receipt-value">{formData.name}</span>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">Email</span>
                        <span className="receipt-value">{formData.email}</span>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">Service</span>
                        <span className="receipt-value">{formData.service}</span>
                      </div>
                      <div className="receipt-divider"></div>
                      <div className="receipt-row">
                        <span className="receipt-label">Date</span>
                        <span className="receipt-value">{formatDate(formData.date)}</span>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">Time</span>
                        <span className="receipt-value">{formData.time}</span>
                      </div>
                      {selectedPkg && (
                        <>
                          <div className="receipt-divider"></div>
                          <div className="receipt-row">
                            <span className="receipt-label">Package</span>
                            <span className="receipt-value">{selectedPkg.name}</span>
                          </div>
                          <div className="receipt-row receipt-total">
                            <span className="receipt-label">Total</span>
                            <span className="receipt-value">{selectedPkg.price}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="success-footer">
                    <p className="confirmation-email-msg">
                      <i className='bx bx-mail-send'></i> A confirmation email has been sent to <strong>{formData.email}</strong>
                    </p>
                    <button type="button" className="btn-outline-white px-5 py-3 w-100 step-btn" onClick={resetForm}>
                      <i className='bx bx-plus-circle'></i> Book Another Session
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        <i className='bx bx-check-circle text-success' style={{color: 'var(--success-green)'}}></i>
        <div>
          <strong>Booking Confirmed!</strong>
          <p className="mb-0 text-light-3" style={{ fontSize: '0.8rem' }}>Your details have been successfully recorded.</p>
        </div>
      </div>
    </section>
  );
}
