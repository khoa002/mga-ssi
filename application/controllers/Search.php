<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Search extends CI_Controller {
    public function __construct(){
        parent::__construct();
    }
    
    public function index() {
        $this->load->model("Search_model");
        $data["states"] = $this->Search_model->get_states();
        $this->load->view('search', $data);
    }

    public function get_info_by_state(){
        if (!$this->input->post("state")) die("Invalid");
        $this->load->model("Search_model");
        $result = $this->Search_model->get_info_by_state($this->input->post("state"));
        die(json_encode($result));
    }

    public function get_sports(){
        $key = !$this->input->post("key") ? "name" : $this->input->post("key");
        $this->load->model("Search_model");
        $result = $this->Search_model->get_sports($key);
        die(json_encode($result));
    }

    public function get_schools_sports_info(){
        $schoolid = !$this->input->post("state") ? "all" : $this->input->post("state");
        $this->load->model("Search_model");
        $result = $this->Search_model->get_schools_sports_info($schoolid);
        die(json_encode($result));
    }
}
