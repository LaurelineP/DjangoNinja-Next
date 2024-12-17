'use client'
import { Fragment } from 'react';
import Anime from 'react-anime';
import './logo.css'


const localHasVisited = JSON.parse(localStorage.getItem('hasVisited__ioLinkr'))

const AnimeWrapper =  (props) => {
    return (
		 <Anime
            easing="easeInOutQuad"
            duration={1500}
            loop={false}
            svg
            component="g"
            delay={(el, index) => index * 300}
            stroke="url(#_Linear1)"
            strokeWidth={16}
			fill="transparent"
            strokeDashoffset={(el) => {
                if (!el || !el.children) return 0;
                var pathLength = '0';
                for (var key in el.children) {
                    let child = el.children[key];
                    if (child && child.getTotalLength) {
                        pathLength = child.getTotalLength().toString();
                        el.setAttribute('stroke-dasharray', pathLength);
                    }
                }
                return [pathLength, 0];
            }}
			
		{...props}
        />
	);
}

const LogoPaths = () => {
	// Has Visited purpose: runs logo anime
	

	// mimic visit state to initiate the first time the anime
	const shouldAnimate = JSON.parse(localHasVisited)
	const Wrapper = shouldAnimate ? Fragment : AnimeWrapper
	const clss = shouldAnimate ? '' : 'animated'
	return (
		<Wrapper >
			<path d="M2756 5029 c-224 -54 -536 -259 -536 -351 0 -59 38 -46 140 50 373 349 940 332 1310 -38 510 -509 269 -1391 -428 -1573 -301 -79 -518 -32 -857 184 -79 51 -110 -12 -35 -72 515 -415 1274 -241 1571 358 381 769 -328 1645 -1165 1442z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M2812 4818 c-218 -52 -449 -242 -548 -454 -93 -197 -71 -685 27 -603 19 16 20 39 5 95 -154 555 467 1083 988 840 121 -56 306 -214 327 -278 16 -52 89 -50 89 1 0 55 -210 265 -320 321 -181 93 -385 121 -568 78z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M2870 4603 c-138 -36 -330 -166 -330 -223 0 -45 58 -40 113 11 397 369 1029 -75 799 -561 -90 -191 -249 -294 -454 -294 -112 0 -278 55 -307 102 -7 12 -31 22 -52 22 -72 0 -42 -68 55 -127 570 -344 1179 390 734 885 -139 154 -375 233 -558 185z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M2896 4381 c-345 -110 -321 -701 29 -701 86 0 67 52 -38 104 -269 135 -189 516 109 516 159 0 296 -135 281 -277 -7 -68 16 -105 56 -89 50 19 27 205 -38 302 -80 121 -265 188 -399 145z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M2220 2245 c-80 -239 -150 -446 -155 -460 -5 -14 3 -25 18 -25 26 0 320 829 318 895 -3 86 -53 -27 -181 -410z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M600 2220 l0 -420 90 0 90 0 0 420 0 420 -90 0 -90 0 0 -420z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M1454 2612 c-304 -112 -338 -610 -53 -770 300 -169 619 28 619 381 0 313 -270 499 -566 389z m259 -125 c230 -109 151 -567 -99 -567 -318 0 -316 570 3 598 15 1 58 -13 96 -31z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M2520 2220 l0 -420 272 0 c191 0 269 7 264 22 -5 16 -84 22 -242 19 l-234 -3 0 401 c0 343 -4 401 -30 401 -26 0 -30 -60 -30 -420z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M3180 2220 c0 -360 4 -420 30 -420 26 0 30 60 30 420 0 360 -4 420 -30 420 -26 0 -30 -60 -30 -420z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M3420 2221 c0 -358 4 -421 30 -421 24 0 30 60 35 379 l5 380 226 -380 c306 -512 304 -512 304 41 0 369 -4 420 -32 420 -27 0 -30 -45 -25 -389 l7 -390 -60 102 c-303 512 -405 667 -446 673 l-44 7 0 -422z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M4220 2220 c0 -360 4 -420 30 -420 24 0 30 32 30 168 0 254 18 256 244 21 124 -128 199 -191 222 -186 26 5 -18 60 -171 213 l-205 206 220 208 c158 150 209 209 180 209 -24 1 -126 -85 -265 -224 l-225 -224 0 224 c0 187 -5 225 -30 225 -26 0 -30 -60 -30 -420z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M4900 2222 c0 -362 4 -422 30 -422 25 0 30 34 30 190 l0 190 157 0 c180 0 211 -20 233 -150 28 -166 51 -230 83 -230 23 0 28 12 19 45 -8 25 -23 98 -35 164 -14 74 -39 135 -68 164 -44 44 -45 46 -6 58 49 16 117 123 117 185 0 148 -98 207 -365 220 l-195 9 0 -423z m442 300 c140 -141 30 -282 -220 -282 l-162 0 0 170 0 170 162 0 c151 0 165 -3 220 -58z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
			<path d="M930 1967 c-51 -51 -32 -152 34 -175 110 -38 186 110 92 177 -57 39 -85 39 -126 -2z"
				style={{ stroke: 'url(#_Linear1)', }}
			/>
		</Wrapper>
	)
}


export default function Logo() {
	if(!localHasVisited){
		localStorage.setItem('hasVisited__ioLinkr', true)
	}
	const shouldAnimate = JSON.parse(localHasVisited)
	const clss = shouldAnimate ? '' : 'animated'	
	

	
	return (
		<svg id = "logo" className = {clss}
			version="1.0" xmlns="http://www.w3.org/2000/svg" width="300pt" height="300pt" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">
			<defs>
				<style>
					{`@import url('https://fonts.googleapis.com/css2?family=Muli:wght@100&display=swap');`}
				</style>
				<linearGradient
					id="_Linear1"
					x1={0}
					y1={0}
					x2={5}
					y2={0}
					gradientUnits="userSpaceOnUse"
					gradientTransform="matrix(-200,200,-240,-166.667,300,176.389)"
				>
					<stop offset = {0} 		style = {{ stopColor: '#fff', 		stopOpacity: 0.1  }} 	/>
					<stop offset = {1} 		style = {{ stopColor: '#291359', 	stopOpacity: .5  }} 	/>
				</linearGradient>
				
			</defs>
			
			
			<g transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)" fill="#291359" stroke="none">
				<LogoPaths />
			</g>
			<text x="150" y="240" fontSize="16" textAnchor="middle" fill="#777" style={{fontFamily: "'Muli', sans-serif", letterSpacing: "5px", fontWeight: 100}}>Device Management</text>
		</svg>
	)
}
