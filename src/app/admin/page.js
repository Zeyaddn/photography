"use client";
import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "galleries";

  const [galleryData, setGalleryData] = useState({
    title: "",
    category: "Gallery: Landscape"
  });
  const [galleryImagePreview, setGalleryImagePreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  const fileInputRef = useRef(null);
  const projectFileInputRef = useRef(null);

  const [projectData, setProjectData] = useState({
    title: "",
    date: "",
    camera: "",
    lens: "",
    settings: "",
    location: ""
  });
  const [projectImagePreview, setProjectImagePreview] = useState(null);

  const handleUploadClick = (type) => {
    if (type === 'gallery' && fileInputRef.current) fileInputRef.current.click();
    if (type === 'project' && projectFileInputRef.current) projectFileInputRef.current.click();
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'gallery') setGalleryImagePreview(reader.result);
        if (type === 'project') setProjectImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!galleryData.title.trim()) {
      triggerToast("Please provide a title for the photo.", "error");
      return;
    }
    if (!galleryImagePreview) {
      triggerToast("Please select an image to upload.", "error");
      return;
    }
    
    console.log(`[Backend Hook] Gallery Upload:`, galleryData);
    triggerToast("Gallery photo successfully uploaded!", "success");
    setGalleryData({ title: "", category: "Gallery: Landscape" });
    setGalleryImagePreview(null);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    if (!projectData.title.trim()) {
      triggerToast("Project title is required.", "error");
      return;
    }
    if (!projectImagePreview) {
      triggerToast("A project cover photo is required.", "error");
      return;
    }
    
    const missingFields = Object.entries(projectData).filter(([k, v]) => !v.trim());
    if (missingFields.length > 0) {
      triggerToast(`Please fill all project details: ${missingFields[0][0]}`, "error");
      return;
    }

    console.log(`[Backend Hook] Project submitted:`, projectData);
    triggerToast("Project and technical details saved!", "success");
    setProjectData({ title: "", date: "", camera: "", lens: "", settings: "", location: "" });
    setProjectImagePreview(null);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-sm-6">
          <div className="admin-stat-card">
            <div className="stat-icon"><i className='bx bx-images'></i></div>
            <div className="stat-details">
              <h3>248</h3>
              <p>Total Gallery Photos</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="admin-stat-card">
            <div className="stat-icon"><i className='bx bx-folder-open'></i></div>
            <div className="stat-details">
              <h3>12</h3>
              <p>Active Projects</p>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "galleries" ? (
        <div className="row g-4">
          {/* Quick Upload Form UI */}
          <div className="col-lg-4">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="h5 mb-0 text-white">Quick Upload</h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleFormSubmit}>
                  <div 
                    className="upload-zone" 
                    onClick={() => handleUploadClick('gallery')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleUploadClick('gallery') }}
                    aria-label="Upload Gallery Photo"
                  >
                    {galleryImagePreview ? (
                      <img src={galleryImagePreview} alt="Selected gallery image preview" width="400" height="180" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '10px' }} />
                    ) : (
                      <>
                        <i className='bx bx-cloud-upload'></i>
                        <p>Drag & drop photos here or click to browse.</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{display: 'none'}} 
                      onChange={(e) => handleFileChange(e, 'gallery')} 
                      accept="image/*"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="galleryTitle" className="form-label text-white-50">Photo Title</label>
                    <input 
                      id="galleryTitle"
                      type="text" 
                      className="form-control admin-input mb-3" 
                      placeholder="e.g. Golden Gate"
                      value={galleryData.title}
                      onChange={(e) => setGalleryData({...galleryData, title: e.target.value})}
                    />
                    <label htmlFor="galleryCategory" className="form-label text-white-50">Upload To Category</label>
                    <select 
                      id="galleryCategory"
                      className="form-select admin-select" 
                      value={galleryData.category}
                      onChange={(e) => setGalleryData({...galleryData, category: e.target.value})}
                    >
                      <option value="Gallery: Landscape">Gallery: Landscape</option>
                      <option value="Gallery: Architecture">Gallery: Architecture</option>
                      <option value="Gallery: Portrait">Gallery: Portrait</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3 py-2" style={{ background: "var(--primary)", border: "none", fontWeight: 'bold' }}>
                    Upload Photo
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Recent Uploads Table UI */}
          <div className="col-lg-8">
            <div className="admin-card h-100">
              <div className="admin-card-header d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0 text-white">Recent Uploads</h2>
                <button type="button" className="btn btn-sm btn-outline-light admin-btn-tap-target" aria-label="Explore and view all recent gallery uploads">View All</button>
              </div>
              <div className="admin-card-body p-0">
                <div className="table-responsive">
                  <table className="table table-dark table-hover admin-table mb-0" aria-label="Recent Gallery Uploads">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><img src={getCloudinaryUrl("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", {width: 100, quality: 70})} width="45" height="35" className="admin-tbl-img" alt="Alpine Peak - Landscape Photo Thumbnail" loading="lazy"/></td>
                        <td>Alpine Peak</td>
                        <td><span className="badge bg-secondary">Landscape</span></td>
                        <td>Oct 24, 2026</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-outline-info me-2 admin-btn-tap-target" aria-label="Edit Alpine Peak photo details"><i className='bx bx-edit-alt'></i></button>
                          <button type="button" className="btn btn-sm btn-outline-danger admin-btn-tap-target" aria-label="Delete Alpine Peak photo from gallery"><i className='bx bx-trash'></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td><img src={getCloudinaryUrl("https://images.unsplash.com/photo-1486325212027-8081e485255e", {width: 100, quality: 70})} width="45" height="35" className="admin-tbl-img" alt="Dubai Skyscraper - Architecture Photo Thumbnail" loading="lazy"/></td>
                        <td>Dubai Skyscraper</td>
                        <td><span className="badge bg-secondary">Architecture</span></td>
                        <td>Oct 22, 2026</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-outline-info me-2 admin-btn-tap-target" aria-label="Edit Dubai Skyscraper photo details"><i className='bx bx-edit-alt'></i></button>
                          <button type="button" className="btn btn-sm btn-outline-danger admin-btn-tap-target" aria-label="Delete Dubai Skyscraper photo from gallery"><i className='bx bx-trash'></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Add Project Form */}
          <div className="col-lg-5">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="h5 mb-0 text-white">Add Project Image</h2>
              </div>
              <div className="admin-card-body">
                <form onSubmit={handleProjectSubmit}>
                  <div 
                    className="upload-zone mb-3" 
                    onClick={() => handleUploadClick('project')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if(e.key === 'Enter') handleUploadClick('project') }}
                    aria-label="Upload Project Cover Photo"
                  >
                    {projectImagePreview ? (
                      <img src={projectImagePreview} alt="Project photo preview" width="400" height="200" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                      <>
                        <i className='bx bx-image-add'></i>
                        <p>Select Project Cover Photo</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={projectFileInputRef} 
                      style={{display: 'none'}} 
                      onChange={(e) => handleFileChange(e, 'project')} 
                      accept="image/*"
                      aria-hidden="true"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="projectTitle" className="form-label text-white-50">Project Title</label>
                    <input 
                      id="projectTitle"
                      type="text" 
                      className="form-control admin-input" 
                      placeholder="e.g. Nordic Expedition"
                      value={projectData.title}
                      onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <label htmlFor="projectDate" className="form-label text-white-50">Date</label>
                      <input 
                        id="projectDate"
                        type="month" 
                        className="form-control admin-input"
                        value={projectData.date}
                        onChange={(e) => setProjectData({...projectData, date: e.target.value})}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="projectLocation" className="form-label text-white-50">Location</label>
                      <input 
                        id="projectLocation"
                        type="text" 
                        className="form-control admin-input" 
                        placeholder="Dubai, UAE"
                        value={projectData.location}
                        onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <hr className="my-4 opacity-10" />
                  <h6 className="text-primary mb-3">Technical Details</h6>
                  
                  <div className="mb-3">
                    <label htmlFor="projectCamera" className="form-label text-white-50">Camera Body</label>
                    <input 
                      id="projectCamera"
                      type="text" 
                      className="form-control admin-input" 
                      placeholder="Sony A7R IV"
                      value={projectData.camera}
                      onChange={(e) => setProjectData({...projectData, camera: e.target.value})}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="projectLens" className="form-label text-white-50">Lens</label>
                    <input 
                      id="projectLens"
                      type="text" 
                      className="form-control admin-input" 
                      placeholder="24-70mm f/2.8"
                      value={projectData.lens}
                      onChange={(e) => setProjectData({...projectData, lens: e.target.value})}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="projectSettings" className="form-label text-white-50">Settings (EXIF)</label>
                    <input 
                      id="projectSettings"
                      type="text" 
                      className="form-control admin-input" 
                      placeholder="1/100s | f/4 | ISO 100"
                      value={projectData.settings}
                      onChange={(e) => setProjectData({...projectData, settings: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-3" style={{ background: "var(--primary)", border: "none", fontWeight: 'bold' }}>
                    Save Project Image
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="col-lg-7">
            <div className="admin-card h-100">
              <div className="admin-card-header d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0 text-white">Existing Projects</h2>
              </div>
              <div className="admin-card-body p-0">
                <div className="table-responsive">
                  <table className="table table-dark table-hover admin-table mb-0" aria-label="Existing Projects">
                    <thead>
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Location</th>
                        <th scope="col">Technical</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={getCloudinaryUrl("https://images.unsplash.com/photo-1469474968028-56623f02e42e", {width: 100, quality: 70})} width="45" height="35" className="admin-tbl-img" alt="Nordic Expedition Project Cover Thumbnail" loading="lazy"/>
                            <div>
                              <div className="fw-bold">Nordic Expedition</div>
                              <small className="text-white-50">2024</small>
                            </div>
                          </div>
                        </td>
                        <td>Norway</td>
                        <td><small className="text-white-50">Sony A7R V</small></td>
                        <td>
                          <button type="button" className="btn btn-sm btn-outline-info me-2 admin-btn-tap-target" aria-label="Edit Nordic Expedition project details"><i className='bx bx-edit-alt'></i></button>
                          <button type="button" className="btn btn-sm btn-outline-danger admin-btn-tap-target" aria-label="Delete Nordic Expedition project"><i className='bx bx-trash'></i></button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={getCloudinaryUrl("https://images.unsplash.com/photo-1512453979798-5ea266f8880c", {width: 100, quality: 70})} width="45" height="35" className="admin-tbl-img" alt="Modern Architecture Project Cover Thumbnail" loading="lazy"/>
                            <div>
                              <div className="fw-bold">Modern Architecture</div>
                              <small className="text-white-50">2024</small>
                            </div>
                          </div>
                        </td>
                        <td>Dubai</td>
                        <td><small className="text-white-50">Canon R5</small></td>
                        <td>
                          <button type="button" className="btn btn-sm btn-outline-info me-2 admin-btn-tap-target" aria-label="Edit Modern Architecture project details"><i className='bx bx-edit-alt'></i></button>
                          <button type="button" className="btn btn-sm btn-outline-danger admin-btn-tap-target" aria-label="Delete Modern Architecture project"><i className='bx bx-trash'></i></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Toast */}
      <div className={`toast-notification ${toast.show ? 'show' : ''} ${toast.type}`} style={{ zIndex: 10000 }} role="alert" aria-live="assertive">
        <i className={`bx ${toast.type === 'success' ? 'bxs-check-circle text-success' : 'bxs-error-circle text-danger'}`} style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
        <div>
          <strong className="text-white">{toast.type === 'success' ? 'Success!' : 'Requirement Missing'}</strong>
          <p className="mb-0 text-light-3" style={{ fontSize: '0.8rem' }}>{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
