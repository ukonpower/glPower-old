const { Vector3, Vector4, Matrix4 } = require('matrixgl');
const GLPower = require('./glPower')

const screenVert = require('../shader/screen.vs');
const renderFrag = require('../shader/render.fs');
const frag = require('../shader/frag.glsl');
const vert = require('../shader/vert.glsl');

class APP{
    constructor(){
        this.canvas = document.getElementById("canvas");    
        let dpr = window.devicePixelRatio || 1;
        // var dpr = 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        
        this.gl = canvas.getContext('webgl');
        this.glp = new GLPower(this.gl);

        this.time = 0;

        this.init();
        this.animate();
    }

    init(){
        let screenParam = {
            attributes: {
                position:{
                    vertices: this.glp.screen.vertices,
                    stride: 3,
                    index: this.glp.screen.index
                },
            },
            vertex: screenVert,
            fragment: renderFrag,
            uniforms: {
                time: {type: "uniform1f",value: 0},
            }
        }
        this.screen = this.glp.cObject(screenParam);


    }

    animate(){
        this.time += 0.01666;
        const view = Matrix4.lookAt(new Vector3(0,2,5),new Vector3(0,0,0),new Vector3(0,1,0));

        const perspective = Matrix4.perspective({
            fovYRadian: 60 * Math.PI / 180,
            aspectRatio: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 10
        });

        const transform = Matrix4.identity().rotateY(0).scale(2,2,2);
        const mvp = perspective.mulByMatrix4(view).mulByMatrix4(transform);

        this.glp.selectFramebuffer(null);
        this.screen.uniforms.time.value = this.time;
        this.glp.draw(this.screen,"MESH");

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.addEventListener('load',() =>{
    var app = new APP();
});
