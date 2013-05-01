package com.example.tests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class lisakandidaat2 {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://veebirakendus-ut.appspot.com/");
		selenium.start();
	}

	@Test
	public void testLisakandidaat2() throws Exception {
		selenium.open("/#Home");
		selenium.click("link=Lisa kandidaadiks");
		selenium.click("id=loginbutton");
		selenium.waitForPopUp("null", "30000");
		selenium.selectPopUp("");
		selenium.waitForPageToLoad("30000");
		selenium.deselectPopUp();
		selenium.selectWindow("null");
		selenium.click("id=ringkond_9");
		selenium.click("id=partei_1");
		selenium.click("name=o");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isAlertPresent()) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertEquals("Olete end juba lisanud kandidaadiks. Tühistamiseks kontakteeriga rakenduse omanikke.", selenium.getAlert());
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
