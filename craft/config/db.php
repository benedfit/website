<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

$whitelist = array('benedfit.benedfit.dev');

if(in_array($_SERVER['HTTP_HOST'], $whitelist)) {
	return array(
	'server' => 'localhost',
	'user' => 'benedfit',
	'password' => 'Qvsau6v1983',
	'database' => 'benedfit',
	'tablePrefix' => 'craft',
	);
}
else {
	return array(
	'server' => 'mysql.serversfree.com',
	'user' => 'u984548764_bndf',
	'password' => 'Qvsau6v1983',
	'database' => 'u984548764_bndf',
	'tablePrefix' => 'craft',
	);
}
