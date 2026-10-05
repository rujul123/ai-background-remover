import { useMemo, useRef, useState } from 'react'

const presets = [
  { id: 'studio', label: 'Studio', accent: '#7c5cff' },
  { id: 'nature', label: 'Nature', accent: '#10b981' },
  { id: 'product', label: 'Product', accent: '#f59e0b' }
]

const featureList = [
  {
    title: 'Instant AI Cutout',
    text: 'Remove backgrounds in seconds with precision masking built for e-commerce, portraits, and social content.'
  },
  {
    title: 'Pro-Level Templates',
    text: 'Swap into studio scenes, transparent PNG exports, and campaign-ready visuals without leaving the editor.'
  },
  {
    title: 'One-Click Export',
    text: 'Download in high resolution, optimize for web, or generate social-ready exports for your production pipeline.'
  }
]

const stats = [
  { value: '12s', label: 'Average processing' },
  { value: '99.2%', label: 'Edge accuracy' },
  { value: '4K', label: 'Export quality' }
]

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState('studio')
  const fileInputRef = useRef(null)

  const currentPreset = useMemo(
    () => presets.find((preset) => preset.id === selectedPreset) ?? presets[0],
    [selectedPreset]
  )

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setSelectedImage(url)
    setIsRemoved(false)
  }

  const handleRemoveBackground = () => {
    if (!selectedImage) return
    setProcessing(true)
    setTimeout(() => {
      setIsRemoved(true)
      setProcessing(false)
    }, 1500)
  }

  const handleReset = () => {
    setSelectedImage(null)
    setIsRemoved(false)
    setProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">P</div>
          <div className="brand-text">PixelCut AI</div>
        </div>

        <nav className="topnav">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <button className="ghost-button">Log in</button>
      </header>

      <main className="main-layout">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Background removal made premium</span>
            <h1>Erase the noise. Keep the subject.</h1>
            <p>
              Turn product shots, portraits, and marketing imagery into polished assets with
              lightning-fast AI cutout and export tools.
            </p>

            <div className="cta-row">
              <button className="primary-button" onClick={() => fileInputRef.current?.click()}>
                Upload image
              </button>
              <button className="secondary-button">Watch demo</button>
            </div>

            <div className="stat-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="editor-panel">
            <div className="panel-header">
              <span className="panel-pill">AI Editor</span>
              <button className="mini-button">Auto enhance</button>
            </div>

            <div className="image-stage">
              {selectedImage ? (
                <div className="image-stack">
                  <img src={selectedImage} alt="selected preview" className="upload-image" />
                  {isRemoved && (
                    <div className="transparent-overlay" style={{ borderColor: currentPreset.accent }} />
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">✦</div>
                  <p>Drop a JPG, PNG, or HEIC image to remove the background.</p>
                </div>
              )}
            </div>

            <div className="tool-row">
              <div className="preset-group">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    className={selectedPreset === preset.id ? 'preset active' : 'preset'}
                    onClick={() => setSelectedPreset(preset.id)}
                    style={selectedPreset === preset.id ? { borderColor: preset.accent } : undefined}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="action-group">
                <button className="primary-button compact" onClick={handleRemoveBackground} disabled={!selectedImage || processing}>
                  {processing ? 'Removing...' : 'Remove background'}
                </button>
                <button className="secondary-button compact" onClick={handleReset}>Reset</button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-heading">
            <span className="eyebrow">Built for teams</span>
            <h2>Everything you need for premium visuals</h2>
          </div>

          <div className="feature-grid">
            {featureList.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">✦</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="workflow-section">
          <div className="section-heading narrow">
            <span className="eyebrow">Workflow</span>
            <h2>From upload to export in three steps</h2>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step">
              <span>01</span>
              <h3>Upload</h3>
              <p>Drag in a product shot, portrait, or lifestyle image from your camera roll.</p>
            </div>
            <div className="workflow-step">
              <span>02</span>
              <h3>Smart cutout</h3>
              <p>Our AI isolates the subject edge while preserving hair, shadows, and detail.</p>
            </div>
            <div className="workflow-step">
              <span>03</span>
              <h3>Export</h3>
              <p>Download transparent PNGs, website-optimized JPGs, or campaign social assets.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-banner">
          <div>
            <span className="eyebrow">Start free</span>
            <h3>Professional-grade edits for creators, brands, and teams.</h3>
          </div>
          <button className="primary-button">Get started</button>
        </section>
      </main>
    </div>
  )
}

export default App
