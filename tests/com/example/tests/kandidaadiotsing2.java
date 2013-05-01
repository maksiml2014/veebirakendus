package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class kandidaadiotsing2 {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://veebirakendus-ut.appspot.com/");
		selenium.start();
	}

	@Test
	public void testKandidaadiotsing2() throws Exception {
		selenium.open("/#Home");
		selenium.click("link=Kandidaadid");
		selenium.select("id=piirkond", "label=Valimisringkond nr 1 - Tallinna Haabersti, Põhja-Tallinna ja Kristiine linnaosa");
		selenium.click("css=input[type=\"button\"]");
		selenium.select("id=piirkond", "label=Kogu Eesti");
		selenium.select("id=partei", "label=Eesti Rahvameele erakond");
		selenium.click("css=input[type=\"button\"]");
		selenium.select("id=piirkond", "label=Valimisringkond nr 2 - Tallinna Kesklinna, Lasnamäe ja Pirita linnaosa");
		selenium.select("id=partei", "label=Erakond Vali Meid");
		selenium.click("css=input[type=\"button\"]");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
