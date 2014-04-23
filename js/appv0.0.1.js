$(document).ready(function(){
	app.c.init();
	app.v.init();
	app.c.listeners();
})
/////////////////////////////////////////////////////////////////////////////////

var app={m:{},v:{},c:{}};

/////////////////////////////////////////////////////////////////////////////////

app.m.genePool=[];
app.m.activeSubject;

/////////////////////////////////////////////////////////////////////////////////

app.c.init=function(){
	app.m.metadata={"name":"Galapagos","version":"0.0.2"};
	var b=app.c.bounds();
};

app.c.listeners=function(){
	$("#mitLicense").on("click",function(){
		$("#license").slideToggle();
	});

	$("body").keyup(function(e){
		console.log(e.which);
		if (e.which==76){app.m.genePool.push(app.m.activeSubject); app.c.clearContext(); app.v.init(); }
		else if (e.which==78){app.c.clearContext(); app.v.init(); }
	})

};

app.c.bounds=function(){	
	var b=app.m.bounds={};
	b.left=0;
	b.top=0;
	b.right=$(document).width();
	b.bottom=$(document).height();
	b.centerX=b.right/2;
	b.centerY=b.bottom/2;

	return b;
};

app.c.clearContext=function(){
	$("body").html(" ");
}









/////////////////////////////////////////////////////////////////////////////////

app.v.init=function(){
	app.v.style();
/////////////////////////////////////

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.z = 5;
		camera.position.y=centerY;
		camera.theta=0;
		camera.thetaStep=0.005;
		camera.orbitalRadius=30;
		camera.orbit=function(target){
			camera.theta+=camera.thetaStep;
			camera.position.x=camera.orbitalRadius*Math.sin(camera.theta);
			camera.position.z=camera.orbitalRadius*Math.cos(camera.theta);
			camera.lookAt(target)
		};


	var light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
	light.position.set( 0, 0, 5 );
	scene.add( light );



	var renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);













//////////////////////////////////////

	var sphere=function(b){
		var b=b||{};
		var width=b.r || 1;
		var color = b.color || "#fff";

		var geometry=new THREE.IcosahedronGeometry(width,2);
		var material=new THREE.MeshBasicMaterial({color:color});
		var body=new THREE.Mesh(geometry,material);
		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;

		return body;
	};

	var torus=function(b){
		var b=b||{};
		var width=b.r || 1;
		var color = b.color || "#fff";
		var features=b.features || 2*(2+davis.random(10));
		b.thickness=b.thickness || 8;

		var geometry=new THREE.TorusGeometry(width,1,b.thickness,features);
		var material=new THREE.MeshBasicMaterial({color:color});
		var body=new THREE.Mesh(geometry,material);
		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;
		return body;
	};	

	var cylinder=function(b){
		var b=b||{};
		var radiusTop=Math.max(0.5,b.r/3) || 0.3;
		var radiusBottom=Math.max(0.5,b.r/4) || 0;
		var color = b.color || "#fff";
		b.thickness=b.thickness || 8;

		var geometry=new THREE.CylinderGeometry(radiusTop, radiusBottom, 2*b.r);	
		var material=new THREE.MeshBasicMaterial({color:color});
		var body=new THREE.Mesh(geometry,material);
		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;
		return body;
	};	

	var sunburst=function(b){
		var b=b||{};
		var radiusTop=Math.max(0.5,b.r/3) || 0.3;
		var radiusBottom=Math.max(0.5,b.r/4) || 0;
		var color = b.color || "#fff";
		b.thickness=b.thickness || 8;

		var material=new THREE.MeshBasicMaterial({color:color});
		var geometry=new THREE.TorusGeometry(b.r,1,b.thickness,12);

		var spokes=Math.max(3,b.thickness);
		for (var i=0;i<spokes;i++){
			var thetaAngle=90+(i*(360/spokes) );
			var thetaRad=((thetaAngle)*2*b.r*Math.PI)/180;
			var s=new THREE.CylinderGeometry(0.5,0.2,2*b.r);	
			var sMesh=new THREE.Mesh(s,material);
			sMesh.rotation.z=thetaRad;
			sMesh.position.y=geo.getPoint(0,0,b.r,thetaAngle).y2;
			sMesh.position.x=geo.getPoint(0,0,b.r,thetaAngle).x2;
			THREE.GeometryUtils.merge(geometry,sMesh);
		}

		var body=new THREE.Mesh(geometry,material);

		console.log(b.y);
		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;
		return body;	
	};


	var flower=function(b){
		var b=b||{};
		var radiusTop=Math.max(0.5,b.r/3) || 0.3;
		var radiusBottom=Math.max(0.5,b.r/4) || 0;
		var color = b.color || "#fff";
		b.thickness=b.thickness || 8;

		var material=new THREE.MeshBasicMaterial({color:color});
		var geometry=new THREE.TorusGeometry(3,1,b.thickness,12);

		console.log(b.features);
		var spokes=Math.max(3,b.features);
		for (var i=0;i<spokes;i++){
			var thetaAngle=90+(i*(360/spokes) );
			var filamentThickness=0.3;
			var s=new THREE.TorusGeometry(b.r/2,filamentThickness,10,12);	
			var sMesh=new THREE.Mesh(s,material);
			sMesh.position.y=geo.getPoint(0,0,b.r,thetaAngle).y2;
			sMesh.position.x=geo.getPoint(0,0,b.r,thetaAngle).x2;
			THREE.GeometryUtils.merge(geometry,sMesh);
		}


		var body=new THREE.Mesh(geometry,material);

		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;
		return body;	
	};


















/////////////////////////////////////

	//the genome
	var genome=[];
	for (var i=0;i<6;i++){
		var g={};
		g.r=1+davis.random(5);
		g.theta=90;
		g.thickness=3+davis.random(8);
		g.features=2*(2+davis.random(10));
		g.codon="sphere";

		davis.maybe(1,2,function(){g.codon="sunburst";});	
		davis.maybe(1,2,function(){g.codon="torus";});		
		davis.maybe(1,3,function(){g.codon="cylinder";});

		g.codon=davis.darwin([g.codon],_.filter(app.m.genePool,function(n){
			return n[i].codon;
		}));


		g.r=davis.mutate(davis.darwin([g.r],_.filter(app.m.genePool,function(n){
			return n[i].r;
		})));
		g.thickness=davis.mutate(davis.darwin([g.thickness],_.filter(app.m.genePool,function(n){
			return n[i].thickness;
		})));

		g.features=davis.darwin([g.features],_.filter(app.m.genePool,function(n){
			return n[i].features;
		}));

		if (i==0){
			g.codon="torus";
			g.r=2;
			g.thickness=6;
		}
		if (i==1){
			g.codon="sphere";
			g.r=0.5+davis.random(2);
		}

		g.height=(g.codon=="torus" || g.codon=="sphere") ? g.r*2 : (1+davis.random(3));

		genome.push(g);
	}

	app.m.activeSubject=genome;

/////////////////////////////////////
	
	//the ribosome - this should legitimately decorate the genome with x y and r data.

	for (var i=0;i<genome.length;i++){		

		genome[i].y=(i>0) ? geo.getPoint(genome[i-1].x,(genome[i-1].y),0.8*(genome[i-1].r+genome[i].r),genome[i-1].theta).y2 : 0.8*(0-genome[i].r);
		genome[i].x=(i>0) ? geo.getPoint(genome[i-1].x,(genome[i-1].y),0.8*(genome[i-1].r+genome[i].r),genome[i-1].theta).x2 : 0;

		var section=sphere(genome[i]);
		section=(genome[i].codon=="torus") ? torus(genome[i]) : section;		
		section=(genome[i].codon=="cylinder") ? cylinder(genome[i]) : section;
		section=(genome[i].codon=="sunburst") ? flower(genome[i]) : section;

		section.rotation.y= (i==0) ? Math.PI/2 : 0;
		scene.add(section);

		
	}

















////////////////////////////////////////
	var centerY=0;
	for (var i=0;i<genome.length;i++){
		centerY+=(2*genome[i].r);
		centerY= (i==genome.length-1) ? -1*(centerY=centerY/genome.length) : centerY;
		//console.log("centerY: "+centerY);
	}
	camera.position.y=-10;

	var render = function () {
		requestAnimationFrame(render);
		var target=new THREE.Vector3(0,centerY,0);

		camera.orbit(target);	
		renderer.render(scene, camera);
	};

	render();

///////////////////////////////////////////

};



app.v.style=function(){
	davis.style("body",{
		"width":"100%",
		"margin":"0px",
		"padding":"0px",
		"text-align":"center",
		"background":"#555"
	});
};