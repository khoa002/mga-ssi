<?php
class Search_model extends CI_Model {
    function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model("common");
    }

    public function get_states(){
        $query = $this->db->query('SELECT DISTINCT(`state`) FROM `school_info` WHERE 1 ORDER BY `state` ASC');
        $result = $query->result_array();
        $states = array();
        $total_count = 0;
        foreach($result as $index => $value) {
            $count = $this->get_info_by_state($value["state"], "count");
            $total_count += $count;
            $states[$value["state"]] = $this->common->get_state_name($value["state"]) . " ({$count} school" . ($count > 1 ? "s" : "") . ")";
        }
        $states["total"] = $total_count;
        if (isset($states["ZZ"])) unset($states["ZZ"]);
        return $states;
    }

    public function get_info_by_state($state, $mode = "default"){
        $query = $this->db->query("SELECT * FROM `school_info` WHERE `state` LIKE '{$state}' ORDER BY `state` ASC");
        if ($mode == "count") {
            $count = $query->num_rows();
            return $count;
        }
        $result = $query->result_array();
        return $result;
    }

    public function get_sports($key = "name"){
        $query = $query = $this->db->query("SELECT * FROM `sports_info` WHERE 1 ORDER BY `name` ASC");
        $result = $query->result_array();
        $sports = array();
        if ($key == "id"){
            foreach($result as $index => $value){
                $sports[$value["id"]] = $value["name"];
            }
        } else {
            foreach($result as $index => $value){
                $sports[$value["name"]] = $value["id"];
            }
        }
        return $sports;
    }

    public function get_schools_sports_info($schoolid = "all"){
        if ($schoolid == "all") $query = $query = $this->db->query("SELECT * FROM `school_sports` WHERE 1 ORDER BY `id` ASC");
        else $query = $query = $this->db->query("SELECT * FROM `school_sports` WHERE `school_id` = '{$schoolid}' ORDER BY `id` ASC");
        $result = $query->result_array();
        return $result;
    }
} ?>