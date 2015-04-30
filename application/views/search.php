<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Synergy Systems Inc.</title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.4/readable/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/assets/search/search.css">
    <link rel="stylesheet" href="/assets/bootstrap-slider/bootstrap-slider.css">
</head>
<body>
	<div class="container">
		<div class="search-section state">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o active"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span></p>
			</div>
			<p>&nbsp;</p>
			<form id="state" class="form-horizontal">
				<h3>Do you want to restrict your search to a certain state?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label" for="state">State</label>
					<div class="col-sm-10">
						<select id="state" name="state" class="form-control">
							<option value="#" selected="selected">Please make a selection...</option>
							<option value="%"> - No, I have no preference</option>
							<?php foreach($states as $index => $value) {
								if ($index != "total") { ?>
									<option value="<?php echo $index; ?>"> - <?php echo $value; ?></option>
								<?php } ?>
							<?php } ?>
						</select>
					</div>
				</div>
			</form>
		</div>
		<div class="search-section degrees hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o active"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-state-selection">Back</a></p>
			<form id="degrees" class="form-horizontal">
				<h3>What level of degree are you looking for?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label">Degree</label>
					<div class="col-sm-10">
						<div class="checkbox">
							<label><input type="checkbox" id="degree_all" class="checkbox"> All</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="degree_associate" class="checkbox"> Associate</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="degree_bachelor" class="checkbox"> Bachelor</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="degree_master" class="checkbox"> Master</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="degree_doctorate" class="checkbox"> Doctorate</label>
						</div>
					</div>
				</div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-degrees-selection">Continue</a></p>
		</div>
		<div class="search-section tuition hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o"></span><span class="o active"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-degrees-selection">Back</a></p>
			<form id="tuition" class="form-horizontal">
				<h3>What is your desired annual tuition rate?</h3>
				<div id="tuition_slider"></div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-tuition-selection">Continue</a></p>
		</div>
		<div class="search-section enrollment hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o"></span><span class="o"></span><span class="o active"></span><span class="o"></span><span class="o"></span><span class="o"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-tuition-selection">Back</a></p>
			<form id="enrollment" class="form-horizontal">
				<h3>Do you care about the school's current enrollment?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label">Enrollment</label>
					<div class="col-sm-10">
						<input type="text" id="enrollment_slider" style="width: 100%;">
					</div>
				</div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-enrollment-selection">Continue</a></p>
		</div>
		<div class="search-section ratio hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o active"></span><span class="o"></span><span class="o"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-enrollment-selection">Back</a></p>
			<form id="ratio" class="form-horizontal">
				<h3>Do you care about the school's student-to-faculty ratio?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label">Ratio</label>
					<div class="col-sm-10">
						<input type="text" id="ratio_slider" style="width: 100%;">
					</div>
				</div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-ratio-selection">Continue</a></p>
		</div>
		<div class="search-section amenities hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o active"></span><span class="o"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-ratio-selection">Back</a></p>
			<form id="amenities" class="form-horizontal">
				<h3>Any optional amenities?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label">Amenities</label>
					<div class="col-sm-10">
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_no_preference" class="checkbox" checked="checked"> I have no preference</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_all" class="checkbox"> All</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_dorms" class="checkbox"> Dorms</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_dining_hall" class="checkbox"> Dining Hall</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_gym" class="checkbox"> Gym</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="amenities_pool" class="checkbox"> Pool</label>
						</div>
					</div>
				</div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-amenities-selection">Continue</a></p>
		</div>
		<div class="search-section sports hidden">
			<div style="text-align: center;">
				<p class="nav-bullets"><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o"></span><span class="o active"></span></p>
			</div>
			<p><a type="button" class="btn btn-default btn-sm back-to-amenities-selection">Back</a></p>
			<form id="sports" class="form-horizontal">
				<h3>Any sports?</h3>
				<div class="form-group">
					<label class="col-sm-2 control-label">Sports</label>
					<div class="col-sm-10">
						<div class="checkbox">
							<label><input type="checkbox" id="sports_no_preference" class="checkbox" checked="checked"> I have no preference</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="sports_all" class="checkbox"> All</label>
						</div>
						<div class="container sports"></div>
					</div>
				</div>
			</form>
			<p style="text-align: right;"><a type="button" class="btn btn-success btn-sm make-sports-selection">View Results</a></p>
		</div>
		<div class="results" style="text-align: center;">
			<p><h4><span class="count"><?php echo number_format($states["total"], 0) . " school" . ($states["total"] > 1 ? "s" : ""); ?></span> found</h4></p>
			<p><table id="results_table" class="table table-bordered"></table></p>
		</div>
	</div>
	<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script src="/assets/search/search.js"></script>
	<script src="/assets/bootstrap-slider/bootstrap-slider.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js"></script>
</body>
</html>