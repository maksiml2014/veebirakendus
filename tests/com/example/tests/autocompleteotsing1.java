package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class autocompleteotsing1 {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://veebirakendus-ut.appspot.com/");
		selenium.start();
	}

	@Test
	public void testAutocompleteotsing1() throws Exception {
		selenium.open("/");
		selenium.click("link=Kandidaadid");
		selenium.type("id=complete", "Neeme Näl");
		selenium.typeKeys("id=complete", "j");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("id=complete")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("id=complete");
		selenium.click("css=input[type=\"button\"]");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
