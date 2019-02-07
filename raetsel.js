let cypher_path = "#puzzle span";


var selection = null;

$(document).ready(function() {
	initTable(createPuzzle());
	$(cypher_path).click(function (event) {
		setSelection($(event.target).attr("data-c"));
	});
	$(document).keydown(keyDown);

	$('#reset_puzzle').click(resetPuzzle);
	$('#new_puzzle').click(function() {
		document.location.reload(); // XXX are you sure?
	});
});

function createPuzzle() {
	function swap(array, i, j) {
		var tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}

	var raw_puzzles = [
		['/', '/', '−', '−', '/', '+', 364, 182, 294, 7],
		['/', '/', '−', '−', '*', '+', 198, 3, 52, 26],
		['/', '/', '−', '−', '−', '*', 747, 249, 368, 8],
		['/', '/', '−', '−', '*', '+', 700, 10, 450, 15],
		['/', '/', '−', '−', '*', '−', 884, 2, 456, 12],
		['/', '/', '*', '−', '+', '+', 975, 5, 884, 2],
		['/', '/', '−', '−', '−', '*', 112, 14, 60, 10],
		['/', '/', '−', '−', '*', '+', 812, 2, 300, 3],
		['/', '/', '−', '−', '*', '−', 891, 11, 288, 48],
		['/', '/', '−', '−', '*', '+', 590, 59, 308, 2],
		['/', '/', '−', '−', '−', '*', 406, 58, 128, 4],
		['/', '/', '*', '−', '+', '+', 336, 8, 316, 2],
		['/', '/', '−', '−', '*', '−', 285, 3, 144, 18],
		['/', '/', '−', '−', '*', '+', 804, 3, 304, 76],
		['/', '/', '−', '−', '*', '−', 528, 6, 256, 32],
		['/', '/', '−', '−', '/', '+', 108, 18, 62, 2],
		['/', '/', '−', '−', '*', '−', 600, 6, 448, 14],
		['/', '/', '−', '−', '−', '*', 964, 482, 714, 238],
		['/', '/', '−', '−', '−', '*', 774, 387, 424, 53],
		['/', '/', '−', '−', '−', '*', 724, 362, 287, 7],
		['/', '/', '−', '−', '−', '*', 632, 158, 473, 43],
		['/', '/', '−', '−', '*', '−', 572, 4, 486, 6],
		['/', '/', '*', '−', '−', '+', 520, 8, 470, 2],
		['/', '/', '−', '−', '*', '+', 360, 3, 156, 26],
		['/', '/', '−', '−', '*', '−', 750, 5, 432, 36],
		['/', '/', '−', '−', '*', '+', 794, 2, 330, 6],
		['/', '/', '*', '−', '−', '+', 527, 17, 495, 15],
		['/', '/', '−', '−', '*', '−', 868, 14, 696, 12],
		['/', '/', '−', '−', '−', '*', 369, 123, 312, 78],
		['/', '/', '−', '−', '*', '+', 735, 21, 492, 6],
		['/', '/', '−', '/', '−', '−', 300, 12, 10, 5],
		['/', '/', '−', '−', '*', '+', 476, 14, 276, 2],
		['/', '/', '−', '−', '*', '+', 755, 5, 448, 28],
		['/', '/', '−', '−', '*', '−', 627, 3, 480, 6],
		['/', '/', '−', '−', '*', '+', 870, 29, 500, 10],
		['/', '/', '−', '−', '*', '+', 808, 8, 540, 4],
		['/', '/', '−', '−', '−', '*', 522, 261, 280, 35],
		['/', '/', '−', '−', '*', '+', 403, 13, 256, 4],
		['/', '/', '−', '−', '−', '*', 640, 320, 471, 157],
		['/', '/', '−', '−', '*', '+', 960, 32, 504, 12],
		['/', '/', '−', '−', '−', '*', 532, 38, 288, 18],
		['/', '/', '−', '−', '*', '+', 996, 6, 609, 3],
		['/', '/', '−', '−', '/', '+', 876, 292, 640, 4],
		['/', '/', '−', '−', '/', '+', 336, 28, 280, 7],
		['/', '/', '−', '−', '*', '+', 378, 126, 82, 2],
		['/', '/', '−', '−', '*', '+', 255, 5, 108, 18],
		['/', '/', '−', '−', '*', '+', 905, 5, 320, 80],
		['/', '/', '*', '−', '−', '+', 336, 14, 324, 9],
		['/', '/', '−', '−', '*', '+', 810, 6, 442, 2],
		['/', '/', '−', '−', '*', '−', 352, 2, 120, 30],
		['/', '/', '−', '−', '−', '*', 664, 332, 489, 163],
		['/', '/', '−', '/', '−', '−', 396, 22, 12, 3],
		['/', '/', '−', '−', '*', '+', 693, 99, 232, 4],
		['/', '/', '−', '−', '*', '−', 584, 4, 405, 15],
		['/', '/', '−', '−', '*', '−', 224, 2, 120, 6],
		['/', '/', '−', '−', '−', '*', 888, 444, 405, 15],
		['/', '/', '−', '−', '*', '+', 837, 27, 552, 6],
		['/', '/', '−', '−', '−', '*', 651, 93, 360, 12],
		['/', '/', '−', '−', '*', '+', 300, 5, 176, 4],
		['/', '/', '−', '−', '*', '−', 200, 2, 75, 15],
		['/', '/', '−', '/', '+', '+', 204, 12, 6, 3],
		['/', '/', '−', '−', '*', '+', 468, 6, 297, 11],
		['/', '/', '−', '−', '/', '+', 576, 12, 348, 2],
		['/', '/', '−', '−', '−', '*', 324, 162, 190, 38],
		['/', '/', '−', '−', '−', '*', 232, 116, 144, 36],
		['/', '/', '−', '−', '*', '−', 234, 2, 72, 24],
		['/', '/', '−', '−', '*', '−', 964, 2, 291, 97],
		['/', '/', '−', '−', '−', '*', 968, 44, 437, 19],
		['/', '/', '−', '−', '*', '+', 776, 2, 325, 25],
		['/', '/', '−', '−', '−', '*', 483, 69, 152, 4],
		['/', '/', '−', '−', '/', '+', 672, 12, 459, 3],
		['/', '/', '−', '−', '*', '−', 936, 6, 861, 7],
		['/', '/', '−', '−', '*', '+', 405, 3, 216, 6],
		['/', '/', '−', '−', '*', '+', 122, 2, 42, 6],
		['/', '/', '*', '−', '+', '−', 420, 2, 405, 9],
		['/', '/', '−', '−', '−', '*', 994, 142, 396, 6],
		['/', '/', '−', '−', '−', '*', 274, 137, 130, 13],
		['/', '/', '−', '−', '*', '+', 792, 6, 544, 8],
		['/', '/', '−', '−', '−', '*', 406, 29, 228, 19],
		['/', '/', '*', '−', '+', '−', 164, 2, 161, 23],
		['/', '/', '−', '−', '*', '−', 220, 2, 125, 5],
		['/', '/', '−', '−', '*', '+', 848, 8, 343, 49],
		['/', '/', '−', '−', '*', '+', 684, 6, 450, 15],
		['/', '/', '−', '−', '*', '+', 684, 6, 372, 31],
		['/', '/', '−', '−', '*', '+', 866, 2, 364, 28],
		['/', '/', '−', '−', '−', '*', 670, 335, 350, 35],
		['/', '/', '−', '−', '−', '*', 672, 14, 143, 13],
		['/', '/', '−', '−', '/', '+', 198, 6, 108, 2],
		['/', '/', '*', '−', '−', '+', 825, 15, 801, 9],
		['/', '/', '−', '−', '*', '+', 546, 2, 230, 10],
		['/', '/', '−', '−', '−', '*', 525, 35, 200, 10],
		['/', '/', '−', '−', '*', '+', 904, 8, 624, 16],
		['/', '/', '*', '−', '−', '+', 806, 31, 800, 20],
		['/', '/', '−', '−', '*', '+', 494, 38, 270, 2],
		['/', '/', '−', '−', '*', '−', 344, 2, 144, 18],
		['/', '/', '−', '−', '*', '−', 752, 4, 504, 21],
		['/', '/', '−', '−', '−', '*', 576, 192, 496, 124],
		['/', '/', '−', '−', '−', '*', 810, 405, 352, 11],
		['/', '/', '*', '−', '−', '+', 448, 14, 432, 3],
		['/', '/', '−', '−', '*', '+', 864, 144, 380, 2],
		['/', '/', '−', '−', '−', '*', 880, 88, 455, 13],
		['/', '/', '*', '−', '−', '+', 407, 37, 403, 31],
		['/', '/', '−', '−', '*', '+', 900, 6, 624, 8],
		['/', '/', '−', '−', '*', '+', 508, 2, 210, 7],
		['/', '/', '−', '−', '−', '*', 837, 93, 432, 12],
		['/', '/', '−', '−', '*', '−', 392, 2, 285, 3],
		['/', '/', '−', '−', '*', '−', 200, 5, 156, 6],
		['/', '/', '*', '−', '−', '+', 784, 14, 756, 3],
		['/', '/', '−', '−', '−', '*', 528, 132, 416, 52],
		['/', '/', '−', '−', '*', '−', 286, 2, 180, 4],
		['/', '/', '−', '−', '−', '*', 130, 65, 56, 7],
		['/', '/', '−', '−', '−', '*', 268, 134, 168, 42],
		['/', '/', '−', '−', '*', '+', 700, 14, 456, 3],
		['/', '/', '−', '−', '*', '−', 623, 7, 432, 18],
		['/', '/', '−', '−', '*', '−', 448, 8, 272, 17],
		['/', '/', '−', '−', '*', '+', 876, 12, 604, 4],
		['/', '/', '−', '−', '*', '−', 612, 2, 450, 3],
		['/', '/', '−', '−', '*', '−', 420, 10, 144, 24],
		['/', '/', '−', '−', '*', '−', 832, 8, 738, 9],
		['/', '/', '−', '−', '*', '+', 558, 3, 148, 74],
		['/', '/', '−', '−', '*', '+', 378, 18, 228, 4],
		['/', '/', '−', '−', '−', '*', 913, 83, 616, 28],
		['/', '/', '−', '−', '*', '+', 320, 4, 171, 3],
		['/', '/', '−', '−', '−', '*', 424, 212, 309, 103],
		['/', '/', '−', '−', '*', '+', 540, 2, 198, 3],
		['/', '/', '−', '−', '*', '−', 120, 5, 28, 14],
		['/', '/', '−', '−', '*', '+', 528, 3, 272, 4],
		['/', '/', '−', '−', '*', '+', 800, 50, 456, 2],
		['/', '/', '−', '−', '*', '+', 900, 6, 600, 20],
		['/', '/', '−', '−', '−', '*', 892, 223, 620, 31],
		['/', '/', '−', '−', '*', '+', 854, 2, 352, 32],
		['/', '/', '−', '−', '*', '+', 540, 18, 92, 23],
		['/', '/', '−', '−', '*', '−', 976, 2, 448, 28],
		['/', '/', '−', '−', '/', '+', 636, 12, 498, 6],
		['/', '/', '−', '−', '*', '−', 360, 6, 288, 8],
		['/', '/', '−', '−', '−', '*', 248, 62, 140, 10],
		['/', '/', '−', '−', '−', '*', 988, 76, 512, 16],
		['/', '/', '−', '−', '*', '+', 792, 24, 84, 28],
		['/', '/', '−', '−', '*', '+', 68, 17, 20, 2],
		['/', '/', '−', '−', '*', '−', 356, 2, 168, 12],
		['/', '/', '−', '−', '−', '*', 900, 60, 640, 40],
		['/', '/', '−', '−', '*', '−', 996, 2, 610, 5],
		['/', '/', '−', '−', '*', '−', 836, 2, 420, 14],
		['/', '/', '−', '−', '*', '+', 851, 23, 208, 26],
		['/', '/', '−', '−', '−', '*', 956, 478, 708, 236],
		['/', '/', '−', '−', '*', '−', 752, 8, 627, 11],
		['/', '/', '−', '−', '*', '−', 976, 4, 648, 27],
		['/', '/', '−', '−', '*', '−', 686, 7, 608, 8],
		['/', '/', '−', '−', '*', '+', 748, 22, 490, 7],
		['/', '/', '−', '−', '*', '+', 585, 15, 344, 2],
		['/', '/', '−', '−', '*', '+', 848, 212, 156, 3],
		['/', '/', '*', '−', '−', '+', 574, 14, 550, 10],
		['/', '/', '−', '−', '−', '*', 742, 53, 496, 31],
		['/', '/', '−', '−', '*', '+', 224, 56, 72, 2],
		['/', '/', '−', '−', '−', '*', 388, 194, 150, 6],
		['/', '/', '−', '−', '−', '*', 532, 266, 344, 86],
		['/', '/', '−', '−', '*', '−', 784, 2, 441, 7],
		['/', '/', '−', '−', '*', '+', 426, 2, 126, 42],
		['/', '/', '−', '−', '*', '−', 764, 2, 444, 6],
		['/', '/', '−', '−', '*', '+', 792, 11, 512, 16],
		['/', '/', '−', '−', '*', '+', 825, 75, 312, 6],
		['/', '/', '−', '−', '/', '+', 216, 108, 168, 6],
		['/', '/', '−', '−', '*', '+', 944, 4, 595, 7],
		['/', '/', '−', '−', '*', '+', 476, 2, 198, 9],
		['/', '/', '−', '−', '−', '*', 612, 204, 528, 132],
		['/', '/', '−', '−', '−', '*', 708, 354, 378, 42],
		['/', '/', '−', '−', '−', '*', 560, 80, 432, 36],
		['/', '/', '−', '−', '*', '+', 960, 10, 405, 45],
		['/', '/', '−', '−', '*', '+', 976, 16, 144, 48],
		['/', '/', '−', '−', '*', '+', 432, 72, 55, 5],
		['/', '/', '−', '−', '*', '+', 196, 7, 108, 6],
		['/', '/', '−', '−', '−', '*', 352, 176, 120, 4],
		['/', '/', '−', '−', '*', '−', 788, 2, 480, 5],
		['/', '/', '−', '−', '*', '−', 624, 2, 459, 3],
		['/', '/', '−', '−', '*', '−', 324, 2, 190, 5],
		['/', '/', '−', '−', '*', '+', 639, 3, 360, 10],
		['/', '/', '−', '−', '*', '−', 148, 2, 102, 3],
		['/', '/', '−', '−', '/', '+', 528, 44, 404, 4],
		['/', '/', '−', '−', '*', '+', 812, 2, 300, 50],
		['/', '/', '−', '−', '*', '−', 240, 12, 126, 9],
		['/', '/', '−', '−', '*', '+', 930, 31, 612, 6],
		['/', '/', '−', '−', '−', '*', 44, 22, 24, 8],
		['/', '/', '−', '−', '*', '+', 220, 10, 112, 7],
		['/', '/', '−', '−', '−', '*', 702, 78, 252, 6],
		['/', '/', '−', '−', '*', '−', 788, 2, 300, 50],
		['/', '/', '−', '−', '*', '−', 448, 2, 288, 4],
		['/', '/', '−', '−', '−', '*', 869, 79, 600, 30],
		['/', '/', '−', '−', '−', '*', 976, 488, 448, 16],
		['/', '/', '−', '−', '*', '+', 612, 2, 252, 6],
		['/', '/', '*', '−', '+', '−', 470, 2, 450, 6],
		['/', '/', '−', '−', '*', '−', 676, 2, 368, 8],
		['/', '/', '−', '−', '*', '−', 57, 3, 16, 8],
		['/', '/', '−', '−', '*', '+', 988, 38, 609, 7],
		['/', '/', '−', '−', '*', '+', 696, 12, 325, 25],
		['/', '/', '−', '−', '*', '−', 368, 4, 216, 18],
		['/', '/', '−', '−', '*', '+', 636, 106, 234, 3],
		['/', '/', '−', '−', '*', '+', 375, 25, 208, 4],
		['/', '/', '−', '−', '*', '+', 822, 2, 342, 6],
		['/', '/', '−', '−', '*', '+', 608, 2, 255, 17],
		['/', '/', '−', '−', '−', '*', 952, 238, 737, 67],
		['/', '/', '−', '−', '*', '−', 200, 2, 141, 3],
		['/', '/', '−', '−', '−', '*', 696, 174, 380, 10],
		['/', '/', '*', '−', '+', '−', 564, 2, 540, 6],
		['/', '/', '−', '−', '/', '+', 748, 68, 576, 4],
		['/', '/', '−', '−', '*', '+', 426, 3, 160, 40],
		['/', '/', '−', '−', '−', '*', 948, 474, 513, 57],
		['/', '/', '−', '−', '*', '+', 91, 7, 40, 4],
		['/', '/', '−', '−', '*', '−', 932, 2, 570, 5],
		['/', '/', '−', '−', '*', '+', 200, 8, 106, 2],
		['/', '/', '−', '−', '*', '−', 762, 6, 558, 18],
		['/', '/', '−', '−', '*', '+', 956, 2, 316, 79],
		['/', '/', '−', '−', '*', '+', 628, 4, 378, 18],
		['/', '/', '*', '−', '−', '+', 896, 16, 869, 11],
		['/', '/', '−', '−', '*', '−', 802, 2, 374, 22],
		['/', '/', '−', '−', '*', '−', 464, 2, 192, 24],
		['/', '/', '−', '−', '*', '−', 940, 2, 481, 13],
		['/', '/', '−', '−', '*', '−', 712, 2, 464, 4],
		['/', '/', '−', '−', '−', '*', 567, 189, 152, 2],
		['/', '/', '−', '−', '*', '+', 366, 3, 192, 12],
		['/', '/', '−', '−', '*', '−', 76, 2, 28, 7],
		['/', '/', '−', '−', '*', '+', 770, 5, 468, 26],
		['/', '/', '−', '−', '*', '−', 200, 10, 77, 11],
		['/', '/', '−', '−', '*', '−', 914, 2, 330, 66],
		['/', '/', '*', '−', '−', '+', 252, 12, 230, 10],
		['/', '/', '−', '−', '*', '+', 912, 228, 168, 3],
		['/', '/', '−', '−', '−', '*', 245, 35, 176, 22],
		['/', '/', '*', '−', '−', '+', 128, 16, 125, 5],
		['/', '/', '−', '−', '*', '+', 216, 3, 80, 20],
		['/', '/', '−', '−', '−', '*', 112, 14, 20, 2],
		['/', '/', '−', '−', '−', '*', 772, 386, 390, 30],
		['/', '/', '−', '−', '*', '+', 600, 8, 200, 40],
		['/', '/', '−', '−', '−', '*', 628, 314, 240, 6],
		['/', '/', '*', '−', '+', '+', 924, 3, 784, 2],
		['/', '/', '−', '−', '*', '−', 275, 5, 228, 6],
		['/', '/', '−', '−', '*', '+', 783, 9, 528, 4],
		['/', '/', '−', '−', '*', '+', 810, 2, 324, 36],
		['/', '/', '−', '−', '−', '*', 792, 33, 400, 25],
		['/', '/', '*', '−', '+', '+', 608, 2, 513, 3],
		['/', '/', '−', '−', '−', '*', 955, 191, 768, 64],
		['/', '/', '−', '−', '*', '+', 464, 116, 152, 2],
		['/', '/', '−', '−', '*', '+', 178, 2, 60, 12],
		['/', '/', '−', '−', '*', '+', 960, 120, 98, 7],
		['/', '/', '−', '−', '*', '+', 185, 5, 64, 16],
		['/', '/', '−', '−', '*', '+', 892, 2, 315, 63],
		['/', '/', '−', '−', '*', '+', 742, 14, 414, 18],
		['/', '/', '−', '−', '*', '−', 334, 2, 102, 34],
		['/', '/', '−', '−', '*', '+', 990, 30, 666, 6],
		['/', '/', '−', '−', '*', '+', 688, 8, 477, 9],
		['/', '/', '−', '−', '−', '*', 960, 40, 132, 4],
		['/', '/', '−', '−', '*', '+', 882, 294, 194, 2],
		['/', '/', '−', '−', '*', '+', 876, 2, 378, 9],
		['/', '/', '−', '−', '*', '−', 950, 2, 492, 12],
		['/', '/', '−', '−', '*', '−', 654, 2, 198, 66],
		['/', '/', '−', '−', '*', '+', 605, 11, 352, 2],
		['/', '/', '−', '−', '−', '*', 984, 492, 576, 96],
		['/', '/', '−', '−', '/', '+', 494, 26, 308, 2],
		['/', '/', '−', '−', '−', '*', 882, 147, 750, 75],
		['/', '/', '−', '−', '−', '*', 192, 48, 155, 31],
		['/', '/', '−', '−', '*', '+', 396, 66, 144, 3],
		['/', '/', '−', '−', '*', '−', 808, 2, 455, 7],
		['/', '/', '−', '−', '*', '−', 250, 2, 156, 4],
		['/', '/', '−', '−', '*', '+', 390, 10, 162, 18],
		['/', '/', '−', '−', '−', '*', 684, 342, 280, 8],
		['/', '/', '−', '−', '*', '−', 594, 2, 180, 60],
		['/', '/', '−', '−', '*', '+', 572, 11, 384, 8],
		['/', '/', '−', '−', '−', '*', 958, 479, 628, 157],
		['/', '/', '−', '−', '−', '*', 960, 80, 750, 50],
		['/', '/', '−', '−', '*', '−', 240, 12, 56, 14],
		['/', '/', '−', '−', '−', '*', 861, 21, 108, 6],
		['/', '/', '−', '−', '*', '+', 905, 5, 608, 8],
		['/', '/', '−', '−', '*', '+', 286, 22, 148, 4],
		['/', '/', '−', '−', '*', '−', 212, 2, 150, 3],
		['/', '/', '−', '−', '*', '+', 525, 105, 80, 4],
		['/', '/', '−', '−', '*', '+', 888, 3, 236, 118],
		['/', '/', '−', '−', '*', '+', 126, 7, 64, 4],
		['/', '/', '−', '−', '/', '+', 648, 6, 358, 2],
		['/', '/', '−', '−', '*', '+', 837, 3, 400, 50],
		['/', '/', '−', '−', '*', '−', 505, 5, 416, 8],
		['/', '/', '−', '−', '*', '−', 846, 3, 416, 52],
		['/', '/', '−', '−', '*', '−', 782, 23, 60, 30],
		['/', '/', '−', '−', '*', '+', 230, 2, 84, 12],
		['/', '/', '−', '−', '*', '+', 720, 3, 272, 68],
		['/', '/', '*', '−', '−', '+', 798, 19, 768, 16],
		['/', '/', '−', '−', '*', '+', 753, 3, 392, 4],
		['/', '/', '−', '−', '*', '−', 886, 2, 418, 22],
		['/', '/', '−', '−', '/', '+', 296, 74, 170, 2],
		['/', '/', '−', '−', '*', '+', 436, 2, 180, 10],
		['/', '/', '−', '−', '*', '−', 256, 2, 105, 15],
		['/', '/', '−', '−', '−', '*', 220, 110, 156, 52],
		['/', '/', '−', '−', '−', '*', 480, 240, 351, 117],
		['/', '/', '−', '−', '*', '+', 360, 30, 192, 2],
		['/', '/', '−', '−', '*', '+', 432, 36, 232, 2],
		['/', '/', '−', '−', '*', '+', 416, 104, 136, 2],
		['/', '/', '−', '−', '−', '*', 920, 230, 500, 10],
		['/', '/', '−', '−', '−', '*', 717, 239, 416, 16],
		['/', '/', '−', '−', '*', '+', 588, 7, 396, 6],
		['/', '/', '−', '−', '−', '*', 366, 61, 168, 7],
		['/', '/', '−', '−', '−', '*', 168, 84, 117, 39],
		['/', '/', '−', '−', '/', '+', 720, 24, 452, 2],
		['/', '/', '−', '−', '*', '+', 640, 2, 225, 45],
		['/', '/', '−', '−', '−', '*', 152, 38, 72, 6],
		['/', '/', '*', '−', '+', '+', 96, 2, 81, 3],
		['/', '/', '−', '−', '*', '+', 700, 10, 472, 4],
		['/', '/', '−', '−', '*', '−', 634, 2, 304, 16],
		['/', '/', '−', '−', '*', '−', 412, 2, 224, 7],
		['/', '/', '−', '−', '−', '*', 432, 24, 231, 21],
		['/', '/', '*', '−', '−', '+', 874, 23, 864, 12],
		['/', '/', '−', '−', '−', '*', 948, 158, 750, 50],
		['/', '/', '−', '−', '−', '*', 116, 58, 48, 6],
		['/', '/', '−', '−', '*', '−', 632, 4, 473, 11],
		['/', '/', '*', '−', '+', '+', 650, 2, 572, 4],
		['/', '/', '−', '−', '*', '+', 816, 4, 385, 55],
		['/', '/', '−', '−', '*', '+', 252, 12, 120, 8],
		['/', '/', '−', '−', '−', '*', 567, 63, 432, 36],
		['/', '/', '−', '−', '−', '*', 665, 19, 168, 12],
		['/', '/', '−', '−', '−', '*', 975, 195, 640, 20],
		['/', '/', '−', '−', '−', '*', 314, 157, 96, 3],
		['/', '/', '−', '−', '/', '+', 780, 156, 642, 6],
		['/', '/', '−', '−', '*', '−', 759, 23, 280, 20],
		['/', '/', '−', '−', '*', '+', 770, 10, 324, 36],
		['/', '/', '−', '−', '−', '*', 940, 470, 316, 4],
		['/', '/', '−', '−', '*', '+', 768, 8, 540, 9],
		['/', '/', '−', '−', '*', '+', 860, 10, 585, 15],
		['/', '/', '−', '−', '/', '+', 950, 38, 604, 2],
		['/', '/', '−', '−', '*', '+', 542, 2, 228, 12],
		['/', '/', '−', '−', '*', '+', 92, 2, 30, 5],
		['/', '/', '−', '−', '*', '+', 306, 17, 176, 4],
		['/', '/', '*', '−', '−', '+', 341, 11, 325, 5],
		['/', '/', '−', '−', '*', '+', 576, 48, 270, 5],
		['/', '/', '−', '−', '*', '−', 572, 4, 338, 26],
		['/', '/', '−', '−', '*', '−', 384, 4, 335, 5],
		['/', '/', '−', '−', '*', '+', 468, 9, 192, 24],
		['/', '/', '−', '−', '*', '+', 738, 3, 420, 10],
		['/', '/', '−', '−', '−', '*', 868, 434, 530, 106],
		['/', '/', '−', '−', '*', '+', 384, 32, 207, 3],
		['/', '/', '*', '−', '−', '+', 559, 13, 539, 7],
		['/', '/', '−', '−', '−', '*', 596, 298, 360, 72],
		['/', '/', '−', '−', '*', '−', 897, 3, 576, 18],
		['/', '/', '−', '−', '*', '+', 846, 2, 368, 16],
		['/', '/', '−', '−', '*', '−', 276, 6, 150, 15],
		['/', '/', '−', '−', '*', '+', 732, 6, 500, 10],
		['/', '/', '−', '−', '−', '*', 474, 237, 270, 45],
		['/', '/', '−', '−', '*', '−', 868, 14, 570, 19],
		['/', '/', '−', '−', '−', '*', 992, 124, 735, 35],
		['/', '/', '−', '−', '−', '*', 954, 318, 832, 208],
		['/', '/', '−', '−', '*', '+', 540, 90, 70, 5],
		['/', '/', '−', '−', '*', '+', 288, 8, 176, 4],
		['/', '/', '−', '−', '*', '+', 567, 3, 248, 2],
		['/', '/', '−', '−', '−', '*', 500, 250, 261, 29],
		['/', '/', '−', '−', '/', '+', 576, 12, 420, 4],
		['/', '/', '−', '−', '−', '*', 774, 129, 216, 3],
		['/', '/', '−', '−', '*', '−', 833, 49, 140, 14],
		['/', '/', '−', '−', '*', '+', 600, 40, 340, 4],
		['/', '/', '−', '−', '*', '+', 261, 87, 56, 2],
		['/', '/', '*', '−', '+', '+', 736, 4, 700, 5],
		['/', '/', '−', '−', '/', '+', 756, 54, 543, 3],
		['/', '/', '−', '−', '−', '*', 572, 143, 378, 21],
		['/', '/', '−', '/', '+', '+', 900, 18, 12, 3],
		['/', '/', '−', '−', '−', '*', 540, 180, 464, 116],
		['/', '/', '−', '−', '/', '+', 810, 54, 512, 2],
		['/', '/', '−', '−', '*', '+', 987, 21, 300, 30],
		['/', '/', '−', '−', '/', '+', 992, 62, 630, 2],
		['/', '/', '−', '−', '*', '−', 700, 2, 300, 30],
		['/', '/', '−', '−', '*', '−', 625, 5, 448, 16],
		['/', '/', '−', '−', '*', '−', 768, 4, 560, 14],
		['/', '/', '−', '−', '*', '+', 846, 6, 234, 78],
		['/', '/', '−', '/', '−', '−', 396, 18, 12, 4],
		['/', '/', '−', '−', '*', '+', 828, 2, 360, 15],
		['/', '/', '−', '−', '*', '+', 473, 11, 200, 20],
		['/', '/', '−', '−', '*', '−', 592, 8, 104, 52],
		['/', '/', '−', '−', '*', '+', 348, 3, 176, 4],
		['/', '/', '−', '−', '−', '*', 918, 306, 572, 26],
		['/', '/', '−', '−', '*', '+', 500, 20, 316, 4],
		['/', '/', '*', '−', '+', '−', 492, 2, 483, 23],
		['/', '/', '*', '−', '+', '−', 448, 2, 432, 9],
		['/', '/', '−', '−', '*', '−', 904, 2, 357, 51],
		['/', '/', '−', '−', '*', '−', 760, 20, 168, 28],
		['/', '/', '−', '−', '*', '+', 851, 23, 512, 2],
		['/', '/', '−', '−', '−', '*', 380, 76, 192, 8],
		['/', '/', '−', '−', '−', '*', 468, 52, 336, 28],
		['/', '/', '−', '−', '*', '−', 171, 9, 48, 12],
		['/', '/', '−', '−', '*', '+', 528, 88, 136, 4],
		['/', '/', '−', '−', '*', '−', 678, 6, 308, 44],
		['/', '/', '−', '−', '*', '+', 496, 8, 288, 16],
		['/', '/', '−', '−', '*', '−', 220, 4, 72, 24],
		['/', '/', '−', '−', '−', '*', 246, 82, 96, 4],
		['/', '/', '−', '−', '*', '+', 654, 6, 364, 28],
		['/', '/', '−', '−', '−', '*', 334, 167, 144, 9],
		['/', '/', '−', '−', '*', '+', 826, 2, 324, 4],
		['/', '/', '−', '−', '/', '+', 518, 14, 316, 2],
		['/', '/', '−', '−', '*', '+', 750, 30, 484, 4],
		['/', '/', '−', '−', '*', '−', 468, 3, 400, 4],
		['/', '/', '−', '−', '*', '−', 812, 2, 600, 3],
		['/', '/', '−', '−', '*', '+', 928, 4, 544, 34],
		['/', '/', '−', '−', '−', '*', 548, 274, 255, 15],
		['/', '/', '−', '−', '*', '−', 747, 3, 480, 16],
		['/', '/', '−', '−', '−', '*', 510, 102, 256, 8],
		['/', '/', '−', '/', '−', '−', 532, 19, 14, 2],
		['/', '/', '−', '−', '*', '+', 663, 3, 176, 88],
		['/', '/', '−', '−', '*', '−', 570, 5, 432, 12],
		['/', '/', '−', '−', '−', '*', 882, 98, 572, 22],
		['/', '/', '−', '−', '−', '*', 999, 333, 672, 48],
		['/', '/', '−', '−', '−', '*', 754, 377, 438, 73],
		['/', '/', '−', '−', '−', '*', 572, 286, 345, 69],
		['/', '/', '−', '−', '*', '−', 720, 6, 483, 23],
		['/', '/', '−', '−', '*', '−', 430, 10, 266, 14],
		['/', '/', '−', '−', '−', '*', 454, 227, 258, 43],
		['/', '/', '−', '−', '*', '+', 468, 3, 256, 8],
		['/', '/', '−', '−', '*', '+', 630, 15, 372, 2],
		['/', '/', '−', '−', '*', '−', 392, 14, 231, 11],
		['/', '/', '*', '−', '−', '+', 208, 8, 188, 2],
		['/', '/', '−', '−', '*', '+', 243, 9, 132, 2],
		['/', '/', '*', '−', '+', '−', 840, 2, 810, 3],
		['/', '/', '−', '−', '*', '+', 440, 110, 144, 2],
		['/', '/', '−', '−', '*', '+', 624, 13, 180, 30],
		['/', '/', '−', '−', '*', '+', 741, 19, 504, 6],
		['/', '/', '−', '−', '*', '+', 753, 3, 200, 100],
		['/', '/', '−', '−', '−', '*', 504, 42, 93, 3],
		['/', '/', '−', '−', '*', '+', 950, 5, 592, 4],
		['/', '/', '−', '−', '*', '+', 906, 2, 320, 64],
		['/', '/', '−', '−', '*', '−', 934, 2, 416, 32],
		['/', '/', '−', '−', '*', '+', 560, 5, 292, 2],
		['/', '/', '−', '−', '*', '+', 972, 18, 228, 38],
		['/', '/', '−', '−', '*', '+', 335, 5, 204, 6],
		['/', '/', '−', '−', '*', '−', 702, 18, 400, 16],
		['/', '/', '−', '−', '*', '−', 864, 9, 476, 34],
		['/', '/', '−', '−', '*', '+', 485, 5, 252, 2],
		['/', '/', '−', '−', '*', '−', 155, 5, 36, 18],
		['/', '/', '−', '−', '*', '−', 567, 3, 352, 16],
		['/', '/', '−', '−', '*', '+', 882, 18, 180, 36],
		['/', '/', '−', '−', '*', '+', 935, 5, 492, 2],
		['/', '/', '−', '−', '*', '−', 810, 15, 480, 20],
		['/', '/', '−', '−', '*', '+', 980, 70, 52, 13],
		['/', '/', '−', '−', '/', '+', 918, 102, 572, 2],
		['/', '/', '−', '−', '*', '−', 148, 2, 63, 9],
		['/', '/', '−', '−', '−', '*', 897, 299, 656, 82],
		['/', '/', '−', '−', '−', '*', 612, 34, 330, 22],
		['/', '/', '−', '/', '+', '−', 864, 24, 16, 2],
		['/', '/', '−', '−', '*', '−', 720, 6, 201, 67],
		['/', '/', '−', '−', '*', '+', 914, 2, 392, 8],
		['/', '/', '−', '−', '*', '+', 720, 60, 340, 5],
		['/', '/', '−', '−', '*', '−', 366, 6, 168, 24],
		['/', '/', '−', '−', '*', '−', 882, 3, 396, 66],
		['/', '/', '−', '−', '−', '*', 624, 156, 486, 54],
		['/', '/', '−', '−', '/', '+', 936, 52, 724, 4],
		['/', '/', '−', '−', '*', '−', 480, 2, 175, 35],
		['/', '/', '−', '−', '−', '*', 742, 371, 390, 39],
		['/', '/', '−', '−', '*', '−', 794, 2, 462, 6],
		['/', '/', '−', '−', '*', '−', 568, 2, 368, 4],
		['/', '/', '−', '/', '+', '−', 216, 8, 6, 3],
		['/', '/', '−', '−', '*', '+', 952, 28, 580, 10],
		['/', '/', '−', '−', '/', '+', 396, 12, 288, 4],
		['/', '/', '−', '−', '*', '−', 660, 66, 63, 9],
		['/', '/', '−', '−', '−', '*', 524, 262, 252, 18],
		['/', '/', '−', '−', '*', '+', 918, 9, 148, 74],
		['/', '/', '−', '−', '*', '+', 336, 12, 204, 3],
		['/', '/', '−', '/', '+', '+', 640, 10, 8, 4],
		['/', '/', '−', '−', '*', '−', 432, 4, 308, 11],
		['/', '/', '*', '−', '+', '+', 100, 2, 88, 4],
		['/', '/', '−', '−', '*', '−', 596, 2, 360, 5],
		['/', '/', '−', '−', '−', '*', 254, 127, 78, 3],
		['/', '/', '−', '−', '*', '−', 238, 2, 110, 10],
		['/', '/', '−', '−', '−', '*', 644, 322, 474, 158],
		['/', '/', '−', '−', '−', '*', 868, 434, 460, 46],
		['/', '/', '−', '−', '−', '*', 256, 32, 130, 10],
		['/', '/', '−', '−', '−', '*', 304, 76, 99, 3],
		['/', '/', '−', '−', '*', '−', 676, 2, 360, 9],
		['/', '/', '−', '−', '−', '*', 740, 370, 546, 182],
		['/', '/', '−', '−', '−', '*', 715, 143, 608, 76],
		['/', '/', '−', '−', '*', '−', 684, 2, 280, 35],
		['/', '/', '−', '−', '−', '*', 516, 258, 198, 6],
		['/', '/', '*', '−', '+', '−', 544, 2, 520, 5],
		['/', '/', '−', '−', '−', '*', 333, 111, 280, 70],
		['/', '/', '−', '−', '*', '+', 878, 2, 380, 20],
		['/', '/', '*', '−', '+', '+', 900, 2, 868, 14],
		['/', '/', '−', '−', '−', '*', 832, 104, 496, 16],
		['/', '/', '−', '−', '*', '+', 819, 3, 360, 60],
		['/', '/', '*', '−', '−', '+', 936, 8, 810, 6],
		['/', '/', '−', '−', '*', '+', 500, 20, 182, 14],
		['/', '/', '−', '−', '*', '+', 220, 2, 84, 7],
		['/', '/', '−', '−', '−', '*', 320, 40, 234, 26],
		['/', '/', '*', '−', '−', '+', 468, 12, 442, 2],
		['/', '/', '−', '−', '/', '+', 702, 6, 388, 2],
		['/', '/', '−', '−', '*', '−', 856, 8, 440, 40],
		['/', '/', '−', '−', '*', '+', 900, 15, 540, 18],
		['/', '/', '−', '−', '*', '+', 320, 20, 170, 5],
		['/', '/', '−', '−', '*', '−', 892, 2, 300, 75],
		['/', '/', '−', '−', '−', '*', 192, 48, 90, 6],
		['/', '/', '−', '−', '*', '+', 492, 6, 250, 25],
		['/', '/', '−', '−', '/', '+', 540, 60, 334, 2],
		['/', '/', '−', '−', '*', '+', 662, 2, 252, 36],
		['/', '/', '−', '−', '*', '−', 417, 3, 312, 6],
		['/', '/', '−', '−', '*', '−', 920, 4, 297, 99],
		['/', '/', '−', '−', '*', '+', 774, 6, 500, 20],
		['/', '/', '−', '−', '−', '*', 238, 119, 98, 7],
		['/', '/', '−', '−', '*', '+', 884, 26, 517, 11],
		['/', '/', '−', '−', '*', '+', 448, 7, 220, 22],
		['/', '/', '−', '−', '*', '+', 612, 6, 369, 3],
		['/', '/', '−', '−', '*', '+', 828, 2, 306, 51],
		['/', '/', '−', '−', '−', '*', 768, 48, 198, 6],
	]

	var puzzle = raw_puzzles[Math.floor(Math.random() * raw_puzzles.length)];

	if (Math.random() < 0.5) {
		// reverse rows
		swap(puzzle, 0, 2);

		if (puzzle[3] == '+') {
			puzzle[3] = '−';
			puzzle[6] += puzzle[8];
		} else if (puzzle[3] == '−') {
			puzzle[3] = '+';
			puzzle[6] -= puzzle[8];
		} else if (puzzle[3] == '*') {
			puzzle[3] = '/';
			puzzle[6] *= puzzle[8];
		} else if (puzzle[3] == '/') {
			puzzle[3] = '*';
			puzzle[6] /= puzzle[8];
		}

		if (puzzle[4] == '+') {
			puzzle[4] = '−';
			puzzle[7] += puzzle[9];
		} else if (puzzle[4] == '−') {
			puzzle[4] = '+';
			puzzle[7] -= puzzle[9];
		} else if (puzzle[4] == '*') {
			puzzle[4] = '/';
			puzzle[7] *= puzzle[9];
		} else if (puzzle[4] == '/') {
			puzzle[4] = '*';
			puzzle[7] /= puzzle[9];
		}

		puzzle[5] = {'+': '−', '−': '+', '*': '/', '/': '*'}[puzzle[5]];
	}

	if (Math.random() < 0.5) {
		// reverse columns
		swap(puzzle, 3, 5);

		if (puzzle[0] == '+') {
			puzzle[0] = '−';
			puzzle[6] += puzzle[7];
		} else if (puzzle[0] == '−') {
			puzzle[0] = '+';
			puzzle[6] -= puzzle[7];
		} else if (puzzle[0] == '*') {
			puzzle[0] = '/';
			puzzle[6] *= puzzle[7];
		} else if (puzzle[0] == '/') {
			puzzle[0] = '*';
			puzzle[6] /= puzzle[7];
		}

		if (puzzle[1] == '+') {
			puzzle[1] = '−';
			puzzle[8] += puzzle[9];
		} else if (puzzle[1] == '−') {
			puzzle[1] = '+';
			puzzle[8] -= puzzle[9];
		} else if (puzzle[1] == '*') {
			puzzle[1] = '/';
			puzzle[8] *= puzzle[9];
		} else if (puzzle[1] == '/') {
			puzzle[1] = '*';
			puzzle[8] /= puzzle[9];
		}

		puzzle[2] = {'+': '−', '−': '+', '*': '/', '/': '*'}[puzzle[2]];
	}

	if (Math.random() > 0.5) {
		swap(puzzle, 0, 3);
		swap(puzzle, 1, 4);
		swap(puzzle, 2, 5);
		swap(puzzle, 7, 8);
	}
	return puzzle;
}

function initTable(puzzle) {
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	}

	var code = ["a", "c", "e", "v", "s", "n", "w", "x", "z", "u"];
	shuffleArray(code);

	function setNumber(id, num) {
		var element = $(id).find('span:nth-child(3)');
		var n = num%10;
		element.attr("data-c", code[n]);
		element.html(code[n]);

		var element = $(id).find('span:nth-child(2)');
		if (num>=10) {
			var n = Math.floor((num/10)%10);
			element.attr("data-c", code[n]);
			element.html(code[n]);
		} else {
			element.html("0");
			element.css("visibility", "hidden");
		}

		var element = $(id).find('span:nth-child(1)');
		if (num>=100) {
			var n = Math.floor((num/100)%10);
			element.attr("data-c", code[n]);
			element.html(code[n]);
		} else {
			element.html("0");
			element.css("visibility", "hidden");
		}
	}

	ops = {
		'+': function(x, y) { return x+y; },
		'−': function(x, y) { return x-y; },
		'*': function(x, y) { return x*y; },
		'/': function(x, y) { return 1.*x/y; }
	}

	var n1 = puzzle[6];
	var n2 = puzzle[7];
	var n3 = ops[puzzle[0]](n1, n2);
	var n4 = puzzle[8];
	var n5 = puzzle[9];
	var n6 = ops[puzzle[1]](n4, n5);
	var n7 = ops[puzzle[3]](n1, n4);
	var n8 = ops[puzzle[4]](n2, n5);
	var n9 = ops[puzzle[2]](n7, n8);

	if (ops[puzzle[5]](n3, n6) != n9) {
		window.alert("Broken puzzle: "+puzzle);
		return;
	}

	$('#op1').html(puzzle[0]);
	$('#op2').html(puzzle[1]);
	$('#op3').html(puzzle[2]);
	$('#op4').html(puzzle[3]);
	$('#op5').html(puzzle[4]);
	$('#op6').html(puzzle[5]);

	setNumber('#num1', n1);
	setNumber('#num2', n2);
	setNumber('#num3', n3);
	setNumber('#num4', n4);
	setNumber('#num5', n5);
	setNumber('#num6', n6);
	setNumber('#num7', n7);
	setNumber('#num8', n8);
	setNumber('#num9', n9);
}

function resetPuzzle() {
	// XXX are you sure?
	$(cypher_path).each(function() {
		$(this).html($(this).attr("data-c"));
		$(this).removeClass("filled");
		$(this).css("background-color", "");
	});
	$("body").removeClass("solved");
	selection = null;
	checkPuzzle();
}

function keyDown(event) {
	var key = event.originalEvent.key;
	if (selection) {
		if (/[0-9]/.test(key)) {
			setCypher(key);
		} else if (key == "Backspace" || key == "Delete") {
			clearCypher();
		}
		selection = null;
		clearSelection();
	}
}

function setSelection(cypher) {
	clearSelection();
	selection = $("[data-c='"+cypher+"']");
	$(selection).each(function() {
		$(this).css("background-color", "#fcc");
	});
}

function clearSelection(selection) {
	selection = null;
	$(cypher_path).css("background-color", "");
}

function setCypher(number) {
	$(selection).html(number);
	$(selection).addClass("filled");
	checkPuzzle();
}

function clearCypher() {
	$(selection).each(function() {
		$(this).html($(this).attr("data-c"));
		$(this).removeClass("filled");
	});
	checkPuzzle();
}

function checkPuzzle() {
	function getNumber(id) {
		let num = 0;
		$('#num'+id+' span').each(function() {
			num *= 10;
			num += parseInt($(this).html());
		});
		return num;
	}

	function getOp(id) {
		var symb = $('#op'+id).html();
		return {
			'+': function(x,y) { return x+y; },
			'−': function(x,y) { return x-y; },
			'*': function(x,y) { return x*y; },
			'/': function(x,y) { return 1.*x/y; },
			'o': function(x,y) { return NaN; }
		}[symb];
	}

	var num = [];
	for(var i=1; i<10; i++) {
		num.push(getNumber(i));
	}

	var ops = [];
	for (var i=1; i<7; i++) {
		ops.push(getOp(i));
	}

	var equations = [
		[0, 0, 1, 2],
		[1, 3, 4, 5],
		[2, 6, 7, 8],
		[3, 0, 3, 6],
		[4, 1, 4, 7],
		[5, 2, 5, 8]
	];

	var score = 0;
	for(e=0; e<equations.length; e++) {
		var eq = equations[e];
		if (num[eq[1]] && num[eq[2]] && num[eq[3]]) {
			var correct = ops[eq[0]](num[eq[1]], num[eq[2]]) == num[eq[3]];
			if (correct) score += 1;
			$('#op'+(e+1)).css("color", correct ? "green" : "red");
		} else {
			$('#op'+(e+1)).css("color", "");
		}
	}

	if (score==6) {
		$("body").addClass("solved");
	} else {
		$("body").removeClass("solved");
	}
}
