<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Search extends CI_Controller {
    public function index() {
        $this->load->model("SearchModel");
        $data["states"] = $this->SearchModel->get_states();
        $this->load->view('search', $data);
    }

    public function get_info_by_state(){
        if (!$this->input->post("state")) die("Invalid");
        $this->load->model("SearchModel");
        $result = $this->SearchModel->get_info_by_state($this->input->post("state"));
        die(json_encode($result));
    }

    public function get_sports(){
        $key = !$this->input->post("key") ? "name" : $this->input->post("key");
        $this->load->model("SearchModel");
        $result = $this->SearchModel->get_sports($key);
        die(json_encode($result));
    }

    public function get_schools_sports_info(){
        $schoolid = !$this->input->post("state") ? "all" : $this->input->post("state");
        $this->load->model("SearchModel");
        $result = $this->SearchModel->get_schools_sports_info($schoolid);
        die(json_encode($result));
    }
}
