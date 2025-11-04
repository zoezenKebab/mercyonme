var music_open = false

//waits for page loading to get working
window.onload = function() {
		main()
		responsive_ui()
		console.log(":3")
};

//placeholder
//lol
function main() {
		let main_bg = document.getElementById("main_bg")
		let nd_bg = document.getElementById("nd_bg")

		nd_bg.style.cursor = "pointer"
		nd_bg.onclick = (event) => {
				trans_1();
		}

		//im a dumbass
		let bc = document.getElementById("bc")
		bc.addEventListener("mouseover", function() {
				bc.src = "res/bc_s_h.png"
				}
		)
		bc.addEventListener("mouseout", function() {
				bc.src = "res/bc_s.png"
				}
		)
		bc.onclick = (event) => {
				window.open("https://mercyonme.bandcamp.com", '_blank')
		}
		//volume controls anyone ?
		document.getElementById("minus").onclick = (event) => {
				modify_volume(0)
		}
		document.getElementById("plus").onclick = (event) => {
				modify_volume(1)
		}
};

function trans_1() {		

		//plays the drone
		initialize_drn()
		initialize_master_button()

		let nd_bg = document.getElementById("nd_bg")
		let main_bg = document.getElementById("main_bg")

		let bg_anim = nd_bg.animate(
				[
						{opacity: 0},
						{opacity: 1},
				],
				{
						id: "fade",
						duration: 4000,
						iterations: 1,
						fill: "both",
						easing: "ease-in-out",
						rangeStart: "cover 0%",
						rangeEnd: "cover 100%",
				}
		)

		let d_menu = document.getElementById("d_menu")
		d_menu.animate(
						[
								{opacity: 0},
								{opacity: 0.9},
						],
						{
								id: "fade_in",
								duration: 4000,
								iterations: 1,
								fill: "both",
								easing: "ease-in-out",
						}
		)
		let music = document.getElementById("music")
		music.onclick = (event) => {
				if (window.music_open == false) {
						get_some_tunes()
				} else {
						close_tunes()
				}
		}

		bg_anim.onfinish = (event) => {
				main_bg.setAttribute("src", "res/bg_main1.png")
				document.getElementById("ico").href="res/main_ico_bright.png"
		}

		//desactivate onclick of bg
		nd_bg.style.cursor = "default"
		nd_bg.onclick = (event) => {
		}
};
