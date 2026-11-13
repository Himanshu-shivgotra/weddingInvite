import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A real WebGL layer: thousands of drifting golden bokeh points in 3D space
// with subtle pointer parallax. Degrades out on reduced-motion / no-webgl.
export default function GoldParticles() {
  const mountRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const mount = mountRef.current
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (e) {
      return
    }
    const w = mount.clientWidth
    const h = mount.clientHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 22

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 260 : 620
    const positions = new Float32Array(COUNT * 3)
    const scales = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      scales[i] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    // soft round golden sprite
    const makeSprite = () => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const g = c.getContext('2d')
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      grd.addColorStop(0, 'rgba(255,240,200,1)')
      grd.addColorStop(0.25, 'rgba(230,200,120,0.9)')
      grd.addColorStop(0.6, 'rgba(201,162,75,0.35)')
      grd.addColorStop(1, 'rgba(201,162,75,0)')
      g.fillStyle = grd
      g.fillRect(0, 0, 64, 64)
      const tex = new THREE.CanvasTexture(c)
      return tex
    }

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.5 : 0.42,
      map: makeSprite(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      opacity: 0.6,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mx = 0
    let my = 0
    const onMove = (e) => {
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) || 0
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) || 0
      mx = (cx / window.innerWidth - 0.5) * 2
      my = (cy / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })

    let raf
    const clock = new THREE.Clock()
    const render = () => {
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.03
      points.rotation.x = Math.sin(t * 0.1) * 0.06
      camera.position.x += (mx * 3 - camera.position.x) * 0.03
      camera.position.y += (-my * 2 - camera.position.y) * 0.03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
    />
  )
}
