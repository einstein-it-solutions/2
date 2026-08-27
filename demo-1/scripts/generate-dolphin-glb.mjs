import { mkdir, writeFile } from 'node:fs/promises'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// GLTFExporter relies on FileReader in browsers. This tiny adapter lets us export
// the same original model during local development without a DCC dependency.
globalThis.FileReader ??= class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(result => {
      this.result = result
      this.onloadend?.({ target: this })
    })
  }
}

const scene = new THREE.Scene()
const dolphin = new THREE.Group()
dolphin.name = 'EchoVision Dolphin'
scene.add(dolphin)

const aqua = new THREE.MeshPhysicalMaterial({
  color: '#47c4f2', metalness: .42, roughness: .19,
  transmission: .08, thickness: .22, clearcoat: 1, clearcoatRoughness: .12,
})
const navy = new THREE.MeshStandardMaterial({ color: '#061b31', metalness: .7, roughness: .18 })
const glow = new THREE.MeshStandardMaterial({ color: '#b9f3ff', emissive: '#1a92be', emissiveIntensity: .4, metalness: .35, roughness: .22 })

function add(geometry, material, position, rotation = [0, 0, 0], scale = [1, 1, 1], name = 'Dolphin form') {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = name
  mesh.position.set(...position)
  mesh.rotation.set(...rotation)
  mesh.scale.set(...scale)
  dolphin.add(mesh)
  return mesh
}

// A deliberately low-poly, original dolphin form: body, curved nose, fins and tail.
add(new THREE.SphereGeometry(1, 32, 20), aqua, [0, 0, 0], [0, 0, 0], [1.58, .61, .63], 'Body')
add(new THREE.SphereGeometry(1, 28, 18), aqua, [1.12, .05, 0], [0, 0, 0], [.78, .47, .5], 'Head')
add(new THREE.SphereGeometry(1, 24, 16), glow, [1.76, -.04, 0], [0, 0, 0], [.68, .19, .25], 'Beak')
add(new THREE.ConeGeometry(.35, 1.08, 4), aqua, [.06, .58, 0], [0, 0, -.25], [.8, 1, .8], 'Dorsal fin')
add(new THREE.ConeGeometry(.27, .98, 4), aqua, [.35, -.1, .61], [1.02, 0, -1.42], [1, 1, .7], 'Right fin')
add(new THREE.ConeGeometry(.27, .98, 4), aqua, [.35, -.1, -.61], [-1.02, 0, -1.42], [1, 1, .7], 'Left fin')
add(new THREE.ConeGeometry(.25, .82, 4), aqua, [-1.58, .16, .34], [0, .86, -.7], [1, 1, .72], 'Tail right')
add(new THREE.ConeGeometry(.25, .82, 4), aqua, [-1.58, .16, -.34], [0, -.86, -.7], [1, 1, .72], 'Tail left')
add(new THREE.SphereGeometry(.075, 14, 10), navy, [1.39, .22, .45], [0, 0, 0], [1, 1, 1], 'Right eye')
add(new THREE.SphereGeometry(.075, 14, 10), navy, [1.39, .22, -.45], [0, 0, 0], [1, 1, 1], 'Left eye')

const orbit = new THREE.Group()
orbit.name = 'Echo orbit'
orbit.rotation.set(.75, .18, -.28)
orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.85, .022, 10, 96), glow))
orbit.add(new THREE.Mesh(new THREE.TorusGeometry(2.18, .012, 8, 96), aqua))
dolphin.add(orbit)

dolphin.rotation.set(.1, -.22, -.1)
dolphin.scale.set(.98, .98, .98)

const exporter = new GLTFExporter()
const glb = await new Promise((resolve, reject) => exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: false }))
await mkdir(new URL('../src/assets/', import.meta.url), { recursive: true })
await writeFile(new URL('../src/assets/echovision-dolphin.glb', import.meta.url), Buffer.from(glb))
console.log('Generated src/assets/echovision-dolphin.glb')
