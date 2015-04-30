var schools, working_copy, tuition_working_copy, enrollment_working_copy, ratio_working_copy, amenities_working_copy, sports_working_copy;
var state, school_sports_info;

$(function() {
    // show state collection
    show_state_selection();
    $(".back-to-state-selection").on("click", function() {
        show_state_selection();
    });
    $(".back-to-degrees-selection").on("click", function() {
        $(".search-section.tuition").addClass("hidden");
        $(".search-section.degrees").removeClass("hidden");
    });
    $(".back-to-tuition-selection").on("click", function() {
        $(".search-section.enrollment").addClass("hidden");
        $(".search-section.tuition").removeClass("hidden");
    });
    $(".back-to-enrollment-selection").on("click", function() {
        $(".search-section.ratio").addClass("hidden");
        $(".search-section.enrollment").removeClass("hidden");
    });
    $(".back-to-ratio-selection").on("click", function() {
        $(".search-section.amenities").addClass("hidden");
        $(".search-section.ratio").removeClass("hidden");
    });
    $(".back-to-amenities-selection").on("click", function() {
        $(".search-section.sports").addClass("hidden");
        $(".search-section.amenities").removeClass("hidden");
    });

    // state selection listeners
    $("form#state").on("change", function(e) {
        state = $("select#state", $(this)).val();
        if (state == "#") return false;
        $.ajax({
            method: "POST",
            url: "/index.php/search/get_info_by_state",
            data: {
                state: state
            }
        }).done(function(r) {
            schools = $.parseJSON(r);
            var countText = schools.length + " school";
            if (schools.length > 1) countText += "s";
            $(".results .count").text(countText);
            $(".search-section.state").addClass("hidden");
            $(".search-section.degrees").removeClass("hidden");
        });
    });

    // degree selection listeners
    $("form#degrees input.checkbox").on("change", function(e) {
        var _this = $(this);
        if (_this.attr("id") == "degree_all") {
            $("form#degrees input.checkbox").prop("checked", _this.prop("checked"));
        }
    });
    $(".make-degrees-selection").on("click", function(e) {
        if ($("form#degrees input.checkbox:checked").length == 0) {
            alert("Please make a selection");
            return false;
        }

        working_copy = [];
        if ($("form#degrees input#degree_associate:checked").length > 0) {
            $.each(schools, function(index, value) {
                if (value.degree_associate == 1) {
                    var exists = false;
                    $.each(working_copy, function(i, v) {
                        if (value.name == v.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) working_copy.push(value);
                }
            });
        }
        if ($("form#degrees input#degree_bachelor:checked").length > 0) {
            $.each(schools, function(index, value) {
                if (value.degree_bachelor == 1) {
                    var exists = false;
                    $.each(working_copy, function(i, v) {
                        if (value.name == v.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) working_copy.push(value);
                }
            });
        }
        if ($("form#degrees input#degree_master:checked").length > 0) {
            $.each(schools, function(index, value) {
                if (value.degree_master == 1) {
                    var exists = false;
                    $.each(working_copy, function(i, v) {
                        if (value.name == v.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) working_copy.push(value);
                }
            });
        }
        if ($("form#degrees input#degree_doctorate:checked").length > 0) {
            $.each(schools, function(index, value) {
                if (value.degree_doctorate == 1) {
                    var exists = false;
                    $.each(working_copy, function(i, v) {
                        if (value.name == v.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) working_copy.push(value);
                }
            });
        }

        var countText = working_copy.length + " school";
        if (working_copy.length > 1) countText += "s";
        $(".results .count").text(countText);

        // generate the tuition selection slider
        // find the min and max tuition rate
        var tuition_min = parseInt(working_copy[0].tuition);
        var tuition_max = parseInt(working_copy[0].tuition);
        $.each(working_copy, function(i, v) {
            var test_value = parseInt(v.tuition);
            if (test_value < tuition_min) tuition_min = test_value;
            if (test_value > tuition_max) tuition_max = test_value;
        });

        // generate tick marks
        var num_of_ticks = 5;
        var increment = parseInt((tuition_max - tuition_min) / num_of_ticks);
        var ticks = [];
        var ticks_labels = [];
        ticks.push(tuition_min);
        ticks_labels.push(numeral(tuition_min).format('$0,0'));
        for (var i = 1; i <= num_of_ticks - 1; i++) {
            var tick_value = tuition_min + (increment * i);
            ticks.push(tick_value);
            ticks_labels.push(numeral(tick_value).format('$0,0'));
        }
        ticks.push(tuition_max);
        ticks_labels.push(numeral(tuition_max).format('$0,0'));

        $("form#tuition #tuition_slider").slider({
            formatter: function(value) {
                return numeral(value).format('$0,0') + " per year";
            },
            ticks: ticks,
            ticks_labels: ticks_labels,
            value: tuition_max
        });

        // event listener for slider
        tuition_working_copy = working_copy;
        $("form#tuition input#tuition_slider").on("slide", function(slideEvt) {
            // console.log(slideEvt.value);
            tuition_working_copy = [];
            $.each(working_copy, function(i, v) {
                if (v.tuition <= slideEvt.value) {
                    var exists = false;
                    $.each(tuition_working_copy, function(a, b) {
                        if (v.name == b.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) tuition_working_copy.push(v);
                }
            });
            var countText = tuition_working_copy.length + " school";
            if (tuition_working_copy.length > 1) countText += "s";
            $(".results .count").text(countText);
        });


        $(".search-section.degrees").addClass("hidden");
        $(".search-section.tuition").removeClass("hidden");
    });
    $(".make-tuition-selection").on("click", function(e) {
        // generate the enrollment slider
        // find the min and max enrollment amount
        var enrollment_min = parseInt(working_copy[0].enrollment);
        var enrollment_max = parseInt(working_copy[0].enrollment);
        $.each(tuition_working_copy, function(i, v) {
            var test_value = parseInt(v.enrollment);
            if (test_value < enrollment_min) enrollment_min = test_value;
            if (test_value > enrollment_max) enrollment_max = test_value;
        });
        var num_of_ticks = 5;
        var increment = parseInt((enrollment_max - enrollment_min) / num_of_ticks);
        var ticks = [];
        var ticks_labels = [];
        ticks.push(enrollment_min);
        ticks_labels.push(numeral(enrollment_min).format('0,0'));
        for (var i = 1; i <= num_of_ticks - 1; i++) {
            var tick_value = enrollment_min + (increment * i);
            ticks.push(tick_value);
            ticks_labels.push(numeral(tick_value).format('0,0'));
        }
        ticks.push(enrollment_max);
        ticks_labels.push(numeral(enrollment_max).format('0,0'));

        $("form#enrollment input#enrollment_slider").slider({
            formatter: function(value) {
                return numeral(value).format('0,0') + " students";
            },
            ticks: ticks,
            ticks_labels: ticks_labels,
            value: enrollment_max
        });

        // event listener for slider
        enrollment_working_copy = tuition_working_copy;
        $("form#enrollment input#enrollment_slider").on("slide", function(slideEvt) {
            // console.log(slideEvt.value);
            enrollment_working_copy = [];
            $.each(tuition_working_copy, function(i, v) {
                if (v.enrollment <= slideEvt.value) {
                    var exists = false;
                    $.each(enrollment_working_copy, function(a, b) {
                        if (v.name == b.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) enrollment_working_copy.push(v);
                }
            });
            var countText = enrollment_working_copy.length + " school";
            if (enrollment_working_copy.length > 1) countText += "s";
            $(".results .count").text(countText);
        });
        $(".search-section.tuition").addClass("hidden");
        $(".search-section.enrollment").removeClass("hidden");
    });

    $(".make-enrollment-selection").on("click", function(e) {
        // generate the ratio slider
        // find the min and max ratio amount
        var ratio_min = parseInt(working_copy[0].student_ratio_per_faculty);
        var ratio_max = parseInt(working_copy[0].student_ratio_per_faculty);
        $.each(enrollment_working_copy, function(i, v) {
            var test_value = parseInt(v.student_ratio_per_faculty);
            if (test_value < ratio_min) ratio_min = test_value;
            if (test_value > ratio_max) ratio_max = test_value;
        });
        var num_of_ticks = 5;
        var increment = parseInt((ratio_max - ratio_min) / num_of_ticks);
        var ticks = [];
        var ticks_labels = [];
        ticks.push(ratio_min);
        ticks_labels.push(numeral(ratio_min).format('0,0'));
        for (var i = 1; i <= num_of_ticks - 1; i++) {
            var tick_value = ratio_min + (increment * i);
            ticks.push(tick_value);
            ticks_labels.push(numeral(tick_value).format('0,0'));
        }
        ticks.push(ratio_max);
        ticks_labels.push(numeral(ratio_max).format('0,0'));

        $("form#ratio input#ratio_slider").slider({
            formatter: function(value) {
                return numeral(value).format('0,0') + " students per faculty";
            },
            ticks: ticks,
            ticks_labels: ticks_labels,
            value: ratio_max
        });

        // event listener for slider
        ratio_working_copy = enrollment_working_copy;
        $("form#ratio input#ratio_slider").on("slide", function(slideEvt) {
            // console.log(slideEvt.value);
            ratio_working_copy = [];
            $.each(enrollment_working_copy, function(i, v) {
                if (v.student_ratio_per_faculty <= slideEvt.value) {
                    var exists = false;
                    $.each(ratio_working_copy, function(a, b) {
                        if (v.name == b.name) {
                            exists = true;
                            return false;
                        }
                    });
                    if (!exists) ratio_working_copy.push(v);
                }
            });
            var countText = ratio_working_copy.length + " school";
            if (ratio_working_copy.length > 1) countText += "s";
            $(".results .count").text(countText);
        });
        $(".search-section.enrollment").addClass("hidden");
        $(".search-section.ratio").removeClass("hidden");
    });

    $(".make-ratio-selection").on("click", function(e) {
        $(".search-section.ratio").addClass("hidden");
        $(".search-section.amenities").removeClass("hidden");
    });

    // degree selection listeners
    $("form#amenities input.checkbox").on("change", function(e) {
        var _this = $(this);
        if (_this.attr("id") == "amenities_all") {
            $("form#amenities input.checkbox:not(input#amenities_no_preference)").prop("checked", _this.prop("checked"));
            if (_this.prop("checked") == true) $("form#amenities input#amenities_no_preference").prop("checked", false);
            else $("form#amenities input#amenities_no_preference").prop("checked", true);
        } else if (_this.attr("id") == "amenities_no_preference") {
            $("form#amenities input.checkbox:not(input#amenities_no_preference)").prop("checked", !_this.prop("checked"));
        } else {
            $("form#amenities input#amenities_no_preference").prop("checked", $("form#amenities input.checkbox:not(input#amenities_no_preference):checked").length == 0);
            $("form#amenities input#amenities_all").prop("checked", $("form#amenities input.checkbox:not(input#amenities_all):checked").length == 0)
        }
    });

    $(".make-amenities-selection").on("click", function(e) {
        if ($("form#amenities input.checkbox:not(input#amenities_no_preference):checked").length == 0) {
            amenities_working_copy = ratio_working_copy;
        } else {
            amenities_working_copy = [];
            if ($("form#amenities input#amenities_dorms:checked").length > 0) {
                $.each(ratio_working_copy, function(index, value) {
                    if (value.amenities_dorms == 1) {
                        var exists = false;
                        $.each(amenities_working_copy, function(i, v) {
                            if (value.name == v.name) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) amenities_working_copy.push(value);
                    }
                });
            }
            if ($("form#amenities input#amenities_dining_hall:checked").length > 0) {
                $.each(ratio_working_copy, function(index, value) {
                    if (value.amenities_dining_hall == 1) {
                        var exists = false;
                        $.each(amenities_working_copy, function(i, v) {
                            if (value.name == v.name) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) amenities_working_copy.push(value);
                    }
                });
            }
            if ($("form#amenities input#amenities_gym:checked").length > 0) {
                $.each(ratio_working_copy, function(index, value) {
                    if (value.amenities_gym == 1) {
                        var exists = false;
                        $.each(amenities_working_copy, function(i, v) {
                            if (value.name == v.name) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) amenities_working_copy.push(value);
                    }
                });
            }
            if ($("form#amenities input#amenities_pool:checked").length > 0) {
                $.each(ratio_working_copy, function(index, value) {
                    if (value.amenities_pool == 1) {
                        var exists = false;
                        $.each(amenities_working_copy, function(i, v) {
                            if (value.name == v.name) {
                                exists = true;
                                return false;
                            }
                        });
                        if (!exists) amenities_working_copy.push(value);
                    }
                });
            }
        }

        // fill out the sports info screen
        $.ajax({
            type: "POST",
            url: "/index.php/search/get_sports"
        }).done(function(r) {
            var sports = $.parseJSON(r);
            $("form#sports .container.sports").html('');
            $.each(sports, function(key, value) {
                $("form#sports .container.sports").append('<div class="col-xs-4 checkbox"><label><input id="sports_selection_' + value + '" value="' + value + '" type="checkbox" class="checkbox"> ' + key + '</label></div>');
            });

            $("form#sports input.checkbox").on("change", function(e) {
                var _this = $(this);
                if (_this.attr("id") == "sports_all") {
                    $("form#sports input.checkbox:not(input#sports_no_preference)").prop("checked", _this.prop("checked"));
                    if (_this.prop("checked") == true) $("form#sports input#sports_no_preference").prop("checked", false);
                    else $("form#sports input#sports_no_preference").prop("checked", true);
                } else if (_this.attr("id") == "sports_no_preference") {
                    $("form#sports input.checkbox:not(input#sports_no_preference)").prop("checked", !_this.prop("checked"));
                } else {
                    $("form#sports input#sports_no_preference").prop("checked", $("form#sports input.checkbox:not(input#sports_no_preference):checked").length == 0);
                    $("form#sports input#sports_all").prop("checked", $("form#sports input.checkbox:not(input#sports_all):checked").length == 0);
                }
            });
        });
        var countText = amenities_working_copy.length + " school";
        if (amenities_working_copy.length > 1) countText += "s";
        $(".results .count").text(countText);
        $(".search-section.amenities").addClass("hidden");
        $(".search-section.sports").removeClass("hidden");
    });

    $(".make-sports-selection").on("click", function(e) {
        var $def = $.Deferred();
        if ($("form#sports input.checkbox:not(input#sports_no_preference):checked").length == 0) {
            sports_working_copy = amenities_working_copy;
            $def.resolve();
        } else {
            $.ajax({
                type: "POST",
                url: "/index.php/search/get_schools_sports_info"
            }).done(function(r) {
                school_sports_info = $.parseJSON(r);
                sports_working_copy = [];
                $("form#sports input.checkbox:not(input#sports_no_preference,input#sports_all):checked").each(function(i, v) {
                    var sport_id = $(this).val();
                    $.each(school_sports_info, function(key, value) {
                        var sport_array = value.sport_id.split(',');
                        // var sport_array = $.map(value.sport_id.split(','), function(theValue) {
                        //     return parseInt(theValue);
                        // });
                        if ($.inArray(sport_id, sport_array) > -1) {
                            var school_info = false;
                            $.each(amenities_working_copy, function(a, b) {
                                if (b.id == value.school_id) {
                                    school_info = b;
                                    return true;
                                }
                            });
                            var exists = false;
                            $.each(sports_working_copy, function(a, b) {
                                if (school_info.name == b.name) {
                                    exists = true;
                                    return false;
                                }
                            });
                            if (!exists) {
                                sports_working_copy.push(school_info);
                            }
                        }
                    });
                });
                $def.resolve();
            });
        }

        $.when($def).done(function() {
            $(".search-section.sports").addClass("hidden");
            var countText = sports_working_copy.length + " school";
            if (sports_working_copy.length > 1) countText += "s";
            $(".results .count").text(countText);
            $(".results table#results_table").html("<thead><tr><th>School Name</th><th>Location</th><th>Enrollment</th><th>Annual Tuition</th><th>Degrees Offered</th><th>Student-Faculty Ratio</th><th>Amenities</th><th>Sports</th></tr></thead><tbody></tbody>");
            $.when($.ajax({
                type: "POST",
                url: "/index.php/search/get_schools_sports_info"
            }), $.ajax({
                type: "POST",
                url: "/index.php/search/get_sports",
                data: {
                    key: "id"
                }
            })).done(function(r, s) {
                var school_sports_info = $.parseJSON(r[0]);
                var sports_info = $.parseJSON(s[0]);
                $.each(sports_working_copy, function(i, v) {
                    var text = "<tr><td><a href='" + v.url + "' target='_blank'>" + v.name + "</a></td>";
                    text += "<td>";
                    if (v.state == "ZZ") text += "Multiple Locations";
                    else text += v.city + ", " + v.state;
                    text += "</td><td>" + numeral(v.enrollment).format('0,0') + "</td><td>" + numeral(v.tuition).format('$0,0') + "</td>";
                    text += "<td>";
                    if (v.degree_associate == 1) text += "Associate<br/>";
                    if (v.degree_bachelor == 1) text += "Bachelor<br/>";
                    if (v.degree_master == 1) text += "Master<br/>";
                    if (v.degree_doctorate == 1) text += "Doctorate";
                    text += "</td>";
                    text += "<td>" + v.student_ratio_per_faculty + " student";
                    if (v.student_ratio_per_faculty > 1) text += "s";
                    text += " per faculty</td>";
                    text += "<td>";
                    if (v.amenities_dorms == 1) text += "Dormitory<br/>";
                    if (v.amenities_dining_hall == 1) text += "Dining Hall<br/>";
                    if (v.amenities_gym == 1) text += "Gymnasium<br/>";
                    if (v.amenities_pool == 1) text += "Swimming Pool";
                    text += "</td>";
                    text += "<td>";
                    $.each(school_sports_info, function(a, b) {
                        if (b.school_id == v.id) {
                            var sport_array = b.sport_id.split(',');
                            $.each(sport_array, function(c, d) {
                                text += sports_info[d] + "<br/>";
                            });
                            return true;
                        }
                    });
                    text += "</td>";
                    text += "</tr>";
                    $(".results table#results_table tbody").append(text);
                });
            });
        });
    });
});

function show_state_selection() {
    reset();
    $("form#state select#state").val("#");
    $(".search-section.state").removeClass("hidden");
    $(".search-section.degrees").addClass("hidden");
}

function reset() {
    state = '%';
    // degree_associate = 1;
    // degree_bachelor = 1;
    // degree_master = 1;
    // degree_doctorate = 1;
}